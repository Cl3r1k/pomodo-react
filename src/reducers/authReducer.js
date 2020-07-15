import * as actionTypes from 'constants/actionTypes';

export const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, isAuthenticated: true };

    case actionTypes.SIGN_OUT:
      return { ...state, isAuthenticated: false };

    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};
