import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

// Context
import { AuthStateContext, AuthDispatchContext } from 'context/AuthContext';

// Reducers
import { authReducer } from 'reducers/authReducer';

const initialState = {
  isAuthenticated: false,
  user: null,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  proxyUrl: process.env.REACT_APP_PROXY_URL,
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};

AuthContextProvider.defaultProps = {
  children: undefined,
};
