import React from 'react';
import { useHistory } from 'react-router-dom';

// Hooks
import { useAuthState } from 'hooks/useAuthState';
import { useAuthDispatch } from 'hooks/useAuthDispatch';

// Components
import { RenderCounter } from 'components/RenderCounter';

export const AuthStatus = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();

  console.info('isAuthenticated: ', isAuthenticated);

  const handleOnClickSignOut = () => {
    // Perform sign-out logic
    // authContext.signOut(() => history.replace('/'));
    authDispatch({ type: 'SIGN_OUT' });
    history.push('/');
  };

  return (
    <div>
      <RenderCounter />

      {isAuthenticated ? (
        <p>
          Welcome, Authenticated user{' '}
          <button type="button" onClick={handleOnClickSignOut}>
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in!</p>
      )}
    </div>
  );
};
