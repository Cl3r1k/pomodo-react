import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Components
import { RenderCounter } from 'components/RenderCounter';

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };
  const handleOnClickSignIn = () => {
    // authContext.authenticate(() => history.replace(from));
    history.replace(from);
  };

  return (
    <div>
      <RenderCounter />

      <h3>You must login to view the page at {from.pathname}</h3>
      <button type="button" onClick={handleOnClickSignIn}>
        Sign in
      </button>
    </div>
  );
};
