import * as actionTypes from 'constants/actionTypes';

// Utils
import { delay, delayCallback } from 'services/utils';

const validateCredentials = credentials =>
  credentials.email === 'Us3r@gmail.com' && credentials.password === 'p@ssw0rd';

export const authActionSignIn = async (dispatch, credentials, callBack) => {
  // TODO: Dispatch auth 'started' ?

  console.info('authActionSignIn() called');
  await delay(1000);

  if (validateCredentials(credentials)) {
    // Emulate async action
    delayCallback(callBack, 100);

    return dispatch({ type: actionTypes.SIGN_IN });
  }

  throw new Error('Not found user with this email or password');

  // TODO: Dispatch auth 'finished' ?
};

export const authActionSignOut = (dispatch, callBack) => {
  // Send request to sign-out probably
  dispatch({ type: actionTypes.SIGN_OUT });
  // Sign out and perform callback immediately
  callBack();
};
