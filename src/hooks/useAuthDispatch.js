import { useContext } from 'react';
import { AuthDispatchContext } from 'context/AuthContext';

export const useAuthDispatch = () => {
  const authDispatch = useContext(AuthDispatchContext);

  if (authDispatch === undefined) {
    throw new Error('useAuthDispatch must be used with AuthContextProvider');
  }

  return authDispatch;
};
