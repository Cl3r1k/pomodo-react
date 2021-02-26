import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Hooks
import { useAuthState } from '@hooks/useAuthState';

// A wrapper for <Route> that redirects to the login screen
// if you're not yet authenticated
export const PrivateRoute: React.FC = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route
      {...rest}
      render={({ location }): React.ReactNode =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};
