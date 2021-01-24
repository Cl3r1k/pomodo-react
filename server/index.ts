import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { TAuthenticationRequest } from '@server/types';
import { config } from '@config/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Access-Control-Allow-Origin, '*' in the header so as to by-pass the CORS error
app.use((_: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authenticate', (req: Request, res: Response) => {
  const {
    clientIdGithub,
    clientSecretGithub,
    redirectUri,
    code,
    provider,
  } = req.body as TAuthenticationRequest;

  console.info('server post ::: req.body: ', req.body);
  console.info('provider: ', provider);
  console.info('config.someConfigProperty: ', config.someConfigProperty);
  // TODO: fix export variables from .env to server (for example export like 'process.env.REACT_APP_CLIENT_SECRET')
  console.info('config.clientIdGithub: ', config.clientIdGithub);
  console.info('config.clientSecretGithub: ', config.clientSecretGithub);
  console.info('config.proxyUrl: ', config.proxyUrl);
  console.info('config.redirectUri: ', config.redirectUri);
  console.info('config.scope: ', config.scope);
  console.info('config.serverPort: ', config.serverPort);

  const data = new FormData();
  data.append('client_id', clientIdGithub);
  data.append('client_secret', clientSecretGithub);
  data.append('code', code);
  data.append('redirect_uri', redirectUri);

  console.info('server POST /authenticate - data: ', data);

  // Request to exchange code for an access token
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: data,
  })
    .then(response => response.text())
    .then(paramString => {
      const params = new URLSearchParams(paramString);
      const accessToken = params.get('access_token') || '';
      const scope = params.get('scope') || '';
      const tokenType = params.get('token_type') || '';

      // Request to return data of a user that has been authenticated
      return fetch(
        `https://api.github.com/user?access_token=${accessToken}&scope=${scope}&token_type=${tokenType}`
      );
    })
    .then(responseAuth => responseAuth.text())
    .then(responseData => {
      return res.status(200).json(responseData);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

app.get('/', (_: Request, res: Response) => {
  res.status(200).json(`
    Available server routes:
    GET '/':                  list of routes (API) (this page)
    GET '/config':            route for test config access (from .env file through alias @config)
    POST '/authenticate':     proxy route to use authenticate API from other providers
    GET '/users':             get users from DB (mongo - mongoose?)
    GET '/user':              get user from DB
    POST '/user':             create user in DB
    PATCH '/user':            update user data in DB
  `);
});

app.get('/config', (_: Request, res: Response) => {
  res
    .status(200)
    .json(`GET /config - response config.serverPort: ${config.serverPort}`);
});

app.get('/users', (_: Request, res: Response) => {
  res.status(200).json('GET /users - list from DB (mongo - mongoose?)');
});

app.get('/user', (_: Request, res: Response) => {
  res.status(200).json('GET /user - get user from DB');
});

app.post('/user', (_: Request, res: Response) => {
  res.status(200).json('POST /user - create user in DB');
});

app.patch('/user', (_: Request, res: Response) => {
  res.status(200).json('PATCH /user - update user in DB');
});

const PORT = config.serverPort || 5000;
app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));
