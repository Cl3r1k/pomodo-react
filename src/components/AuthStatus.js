import React from 'react';
import { RenderCounter } from 'components/RenderCounter';

export const AuthStatus = () => {
  const isAuthenticated = false;

  return (
    <div>
      <RenderCounter />

      {isAuthenticated ? (
        <div>Welcome, Authenticated user</div>
      ) : (
        <div>You should login</div>
      )}
    </div>
  );
};
