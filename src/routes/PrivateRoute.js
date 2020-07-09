/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login screen
// if you're not yet authenticated
export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = false;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

PrivateRoute.defaultProps = {
  children: undefined,
};
