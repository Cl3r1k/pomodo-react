import { useContext } from 'react';

// Context
import { AuthDispatchContext } from '@context/AuthContext';

// Types
import { TReducibleAuthDispatchers } from '@actions/types';

export const useAuthDispatch = (): TReducibleAuthDispatchers => {
  const authDispatch = useContext(AuthDispatchContext);

  if (authDispatch === undefined) {
    throw new Error('useAuthDispatch must be used with AuthContextProvider');
  }

  return authDispatch;
};
