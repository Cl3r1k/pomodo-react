import * as actionTypes from 'constants/actionTypes';

// Utils
import { delay, delayCallback } from 'services/utils';

const validateCredentials = credentials =>
  credentials.email === 'Us3r@gmail.com' && credentials.password === 'p@ssw0rd';

export const authActionSignIn = async (dispatch, credentials, callBack) => {
  // TODO: Dispatch auth 'started' ?

  console.info('authActionSignIn() called');
  if (validateCredentials(credentials)) {
    await delay(1000);

    dispatch({ type: actionTypes.SIGN_IN });

    // Emulate async action
    delayCallback(callBack, 100);
  }

  // TODO: Dispatch auth 'finished' ?
};

export const authActionSignOut = (dispatch, callBack) => {
  dispatch({ type: actionTypes.SIGN_OUT });
  // Emulate async action
  setTimeout(callBack, 100);
};
