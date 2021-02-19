import React, { useReducer } from 'react';

// Context
import { AuthStateContext, AuthDispatchContext } from '@context/AuthContext';

// Reducers
import { authReducer } from '@reducers/authReducer';

// Types
import { TAuthState } from '@context/types';

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
