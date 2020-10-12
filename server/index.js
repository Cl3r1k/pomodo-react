const express = require('express');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const fetch = require('node-fetch');
const config = require('../config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Access-Control-Allow-Origin, '*' in the header so as to by-pass the CORS error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/authenticate', (req, res) => {
  const {
    clientIdGithub,
    clientSecretGithub,
    redirectUri,
    code,
    provider,
  } = req.body;

  console.info('server post ::: req.body: ', req.body);
  console.info('provider: ', provider);
  console.info('config.someConf: ', config.someConf);

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
      const accessToken = params.get('access_token');
      const scope = params.get('scope');
      const tokenType = params.get('token_type');

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

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.info(`Server listening on port: ${PORT}`));
