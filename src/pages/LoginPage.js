import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };
  const handleOnSubmitSignIn = async evt => {
    evt.preventDefault();

    setLoading(true);
    setError('');

    const formElements = evt.target.elements;
    // console.info('formElements: ', formElements);
    const userDetails = {
      email: formElements.email.value,
      password: formElements.password.value,
    };
    // console.info('userDetails: ', userDetails);

    try {
      await authActionSignIn(authDispatch, userDetails, () =>
        history.replace(from)
      );
    } catch (err) {
      setError(err);
      console.info(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <RenderCounter />

      <h3>You must login to view the page at {from.pathname}</h3>

      <form onSubmit={handleOnSubmitSignIn}>
        <fieldset disabled={loading}>
          <label htmlFor="email">
            <input type="text" name="email" id="email" required />
          </label>

          <label htmlFor="password">
            <input type="password" name="password" id="password" required />
          </label>

          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </div>
  );
};
