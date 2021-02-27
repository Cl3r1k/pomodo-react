import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Hooks
import { useAuthDispatch } from '@hooks/useAuthDispatch';

// Actions
import { authSignIn } from '@actions/authActions';

// Components
import { RenderCounter } from '@components/RenderCounter';
import { LoginGithubWithServer } from '@components/LoginGithubWithServer';
import { LoginGithubWithPopup } from '@components/LoginGithubWithPopup';

// Types
import { TCredentials } from '@actions/types';
import { TLocationParams } from '@routes/types';

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const authDispatch = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { from } = (location.state as TLocationParams) || {
    from: { pathname: '/' },
  };

  const handleOnSubmitSignIn = async (
    e: React.SyntheticEvent
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const userDetails: TCredentials = {
      email: target.email.value,
      password: target.password.value,
    };
    // console.info('userDetails: ', userDetails);

    try {
      await authSignIn(authDispatch, userDetails, () => history.replace(from));
    } catch (err) {
      // console.info('error: ', error);
      setError('Something went wrong!');
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

          {error && <span>{error}</span>}
        </fieldset>
      </form>

      <LoginGithubWithPopup />
      <LoginGithubWithServer />
    </div>
  );
};
