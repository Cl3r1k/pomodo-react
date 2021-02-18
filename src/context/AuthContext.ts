import { createContext } from 'react';

// Types
import { TAuthState } from '@context/types';
import { TReducibleAuthDispatchers } from '@actions/types';

export const AuthStateContext = createContext<TAuthState | undefined>(
  undefined
);
AuthStateContext.displayName = 'AuthStateContext';

export const AuthDispatchContext = createContext<
  TReducibleAuthDispatchers | undefined
>(undefined);
AuthDispatchContext.displayName = 'AuthDispatchContext';
