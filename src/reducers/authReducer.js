import * as actionTypes from 'constants/actionTypes';

export const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload };

    case actionTypes.SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};
