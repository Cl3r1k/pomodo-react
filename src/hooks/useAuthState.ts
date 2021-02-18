import { useContext } from 'react';
import { AuthStateContext } from '@context/AuthContext';

// Types
import { TAuthState } from '@context/types';

export const useAuthState = (): TAuthState => {
  const authContext = useContext(AuthStateContext);

  if (authContext === undefined) {
    throw new Error('useAuthState must be used with AuthContextProvider');
  }

  return authContext;
};
