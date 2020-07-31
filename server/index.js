const express = require('express');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const fetch = require('node-fetch');

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
  const { clientId, clientSecret, redirectUri, code } = req.body;

  const data = new FormData();
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);
  data.append('code', code);
  data.append('redirect_uri', redirectUri);

  // Request to exchange code for an access token
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: data,
  })
    .then(response => response.text())
    .then(paramString => {
      const params = new URLSearchParams(paramString);
      const accessToken = params.get('access_toke');
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
