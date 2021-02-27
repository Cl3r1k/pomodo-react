// Types
import {
  SIGN_IN,
  SIGN_OUT,
  TReducibleAuthActions,
  TAuthSignIn,
} from '@actions/types';
import { TAuthState } from '@context/types';

export const authReducer = (
  state: TAuthState,
  action: TReducibleAuthActions
): TAuthState => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: (action as TAuthSignIn).payload || null,
      };

    case SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null };

    default:
      // throw new Error(`Unhandled action type ${action.type}`)
      return state;
  }
};
