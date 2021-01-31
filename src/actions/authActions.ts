// Utils
import { delay, delayCallback } from '@services/utils';
import {
  TCredentials,
  TAuthSignInDispatch,
  TAuthSignOutDispatch,
  TAuthCallback,
  SIGN_IN,
  SIGN_OUT,
} from '@actions/types';

const validateCredentials = ({ email, password }: TCredentials): boolean =>
  email === 'Us3r@gmail.com' && password === 'p@ssw0rd';

export const authSignIn = async (
  authSignInDispatch: TAuthSignInDispatch,
  credentials: TCredentials,
  authCallBack: TAuthCallback
): Promise<void> => {
  // TODO: Dispatch auth 'started' ?

  console.info('authActionSignIn() called');
  await delay(1000);

  if (validateCredentials(credentials)) {
    // Emulate async action
    delayCallback(authCallBack, 100);

    authSignInDispatch({ type: SIGN_IN, payload: 'some user data???' });
  }

  throw new Error('Not found user with this email or password');

  // TODO: Dispatch auth 'finished' ?
};

export const authSignOut = (
  authSignOutDispatch: TAuthSignOutDispatch,
  authCallBack: TAuthCallback
): void => {
  // Send request to sign-out probably
  authSignOutDispatch({ type: SIGN_OUT });

  // Sign out and perform callback immediately
  authCallBack();
};
