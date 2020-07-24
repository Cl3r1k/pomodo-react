import React from 'react';

// Hooks
import { useAuthState } from 'hooks/useAuthState';
// import { useAuthDispatch } from 'hooks/useAuthDispatch';

export const LoginGithub = () => {
  const { clientId, redirectUri } = useAuthState();
  // const authDispatch = useAuthDispatch();
  // const [authGhData, setAuthGhData] = useState({
  //   errorMessage: '',
  //   isLoading: false,
  // });

  console.info('clientId:', clientId, 'redirectUri: ', redirectUri);

  return <div>Login Github</div>;
};
