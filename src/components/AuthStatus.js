import React from 'react';

export const AuthStatus = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <div>Welcome, Authenticated user</div>
  ) : (
    <div>You should login</div>
  );
};
