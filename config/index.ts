interface IConfig {
  clientIdGithub: string;
  clientSecretGithub: string;
  proxyUrl: string;
  redirectUri: string;
  scope: string;
  serverPort: string;
  someConfigProperty: string;
}

export const config: IConfig = {
  clientIdGithub: process.env.REACT_APP_CLIENT_ID || '',
  clientSecretGithub: process.env.REACT_APP_CLIENT_SECRET || '',
  proxyUrl: process.env.REACT_APP_PROXY_URL || '',
  redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  scope: process.env.REACT_APP_SCOPE || '',
  serverPort: process.env.SERVER_PORT || '',
  someConfigProperty: 'Some Config Property',
};
