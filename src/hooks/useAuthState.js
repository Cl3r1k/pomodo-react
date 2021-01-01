import { useContext } from 'react';
import { AuthStateContext } from 'context/AuthContext';

export const useAuthState = () => {
  const authContext = useContext(AuthStateContext);

  if (authContext === undefined) {
    throw new Error('useAuthState must be used with AuthContextProvider');
  }

  return authContext;
};
