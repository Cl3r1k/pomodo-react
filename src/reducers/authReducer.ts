// Types
import { SIGN_IN, SIGN_OUT, TReducibleAuthActions } from '@actions/types';
import { TAuthState } from '@context/types';

export const authReducer = (
  state: TAuthState,
  action: TReducibleAuthActions
): TAuthState => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isAuthenticated: true, user: action.payload };

    case SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      // throw new Error(`Unhandled action type ${action.type}`)
      return state;
  }
};
