import React from 'react';
import { RenderCounter } from 'components/RenderCounter';
import { useHistory } from 'react-router-dom';

export const AuthStatus = () => {
  const history = useHistory();
  const isAuthenticated = false;

  const handleOnClickSignOut = () => {
    // Perform sign-out logic
    // authContext.signOut(() => history.replace('/'));
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
