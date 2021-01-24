export type TAuthenticationRequest = {
  clientIdGithub: string;
  clientSecretGithub: string;
  redirectUri: string;
  code: string;
  provider: string;
};
