export const SIGN_IN = 'authentication/SIGN_IN';
export const SIGN_OUT = 'authentication/SIGN_OUT';

export type TCredentials = {
  email: string;
  password: string;
};

export type TAuthSignIn = {
  type: typeof SIGN_IN;
  payload: string;
};

export type TAuthSignOut = {
  type: typeof SIGN_OUT;
};

export type TAuthSignInDispatch = React.Dispatch<TAuthSignIn>;
export type TAuthSignOutDispatch = React.Dispatch<TAuthSignOut>;

export type TAuthCallback = () => void;

export type TReducibleAuthActions = TAuthSignIn | TAuthSignOut;

export type TReducibleAuthDispatchers =
  | TAuthSignInDispatch
  | TAuthSignOutDispatch;
