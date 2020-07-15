import * as actionTypes from 'constants/actionTypes';

export const authActionSignIn = (dispatch, callBack) => {
  dispatch({ type: actionTypes.SIGN_IN });
  // Emulate async action
  setTimeout(callBack, 100);
};

export const authActionSignOut = (dispatch, callBack) => {
  dispatch({ type: actionTypes.SIGN_OUT });
  // Emulate async action
  setTimeout(callBack, 100);
};
