import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

// Context
import { AuthStateContext, AuthDispatchContext } from 'context/AuthContext';

// Reducers
import { authReducer } from 'reducers/authReducer';

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false });

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
