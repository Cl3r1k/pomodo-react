import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Hooks
import { useAuthDispatch } from 'hooks/useAuthDispatch';

// Actions
import { authActionSignIn } from 'actions/authActions';

// Components
import { RenderCounter } from 'components/RenderCounter';

export const LoginPage = () => {
  const history = useHistory();
  const location = useLocation();
  const authDispatch = useAuthDispatch();

  const { from } = location.state || { from: { pathname: '/' } };
  const handleOnSubmitSignIn = evt => {
    evt.preventDefault();

    const formElements = evt.target.elements;
    console.info('formElements: ', formElements);
    const userDetails = {
      email: formElements.email.value,
      password: formElements.password.value,
    };
    console.info('userDetails: ', userDetails);
    // authContext.authenticate(() => history.replace(from));
    authActionSignIn(authDispatch, userDetails, () => history.replace(from));
    // authDispatch({ type: 'SIGN_IN' });
    // history.replace(from);
  };

  return (
    <div>
      <RenderCounter />

      <h3>You must login to view the page at {from.pathname}</h3>

      <form onSubmit={handleOnSubmitSignIn}>
        <label htmlFor="email">
          <input type="text" name="email" id="email" />
        </label>

        <label htmlFor="password">
          <input type="password" name="password" id="password" />
        </label>

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};
