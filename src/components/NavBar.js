import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Hooks
import { useAuthState } from 'hooks/useAuthState';
import { useAuthDispatch } from 'hooks/useAuthDispatch';

// Actions
import { authActionSignOut } from 'actions/authActions';

// Components
import { RenderCounter } from 'components/RenderCounter';

export const NavBar = () => {
  const history = useHistory();
  const { isAuthenticated, user } = useAuthState();
  const authDispatch = useAuthDispatch();

  console.info('isAuthenticated: ', isAuthenticated);
  console.info('user: ', user);

  const handleOnClickSignOut = () => {
    // Perform sign-out logic
    // authContext.signOut(() => history.replace('/'));
    authActionSignOut(authDispatch, () => history.push('/'));
    // authDispatch({ type: 'SIGN_OUT' });
    // history.push('/');
  };

  return (
    <div>
      <RenderCounter />

      {isAuthenticated ? (
        <div>
          <div>
            <div>Welcome, Authenticated user</div>
            <img src={user?.avatarUrl} alt="Avatar" />
            <span>Login: {user?.login}</span>
            <span>Public repos: {user?.publicRepos}</span>
            <span>Followers: {user?.followers}</span>
          </div>
          <button type="button" onClick={handleOnClickSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <p>You are not logged in!</p>
      )}

      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/about">About Page</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login (testing...)</Link>
          </li>
          <li>
            <Link to="/not-found">Not Found Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
