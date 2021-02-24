// Utils
import {
  TCredentials,
  TReducibleAuthDispatchers,
  TAuthCallback,
  SIGN_IN,
  SIGN_OUT,
} from '@actions/types';
import { delay, delayCallback } from '@utils/common';
import { validateCredentials } from '@utils/validation';

export const authSignIn = async (
  authSignInDispatch: TReducibleAuthDispatchers,
  credentials: TCredentials,
  authCallBack: TAuthCallback
): Promise<void> => {
  // TODO: Dispatch auth 'started' ?

  console.info('authActionSignIn() called');
  await delay(1000);

  if (validateCredentials(credentials)) {
    // Emulate async action
    delayCallback(authCallBack, 100);

    authSignInDispatch({ type: SIGN_IN, payload: { login: 'user', id: 'id' } });
  }

  throw new Error('Not found user with this email or password');

  // TODO: Dispatch auth 'finished' ?
};

export const authSignOut = (
  authSignOutDispatch: TReducibleAuthDispatchers,
  authCallBack: TAuthCallback
): void => {
  // Send request to sign-out probably
  authSignOutDispatch({ type: SIGN_OUT });

  // Sign out and perform callback immediately
  authCallBack();
};
