import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Hooks
import { useAuthState } from 'hooks/useAuthState';
import { useAuthDispatch } from 'hooks/useAuthDispatch';

// Constants
import {
  clientIdGithub,
  clientSecretGithub,
  proxyUrl,
  redirectUri,
  scope,
} from 'constants/api.config';

// Assets
import { ReactComponent as GithubIcon } from 'assets/github-logo.svg';
import styles from './styles.module.scss';

export const LoginGithubWithServer = () => {
  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [authGhData, setAuthGhData] = useState({
    errorMessage: '',
    isLoading: false,
  });

  useEffect(() => {
    // alert('<LoginGithubWithServer /> Called useEffect()');
    const url = window.location.href;
    const hasCode = false; // url.includes('?code=');

    console.info('url: ', url);
    console.info('hasCode: ', hasCode);

    if (hasCode) {
      const newUrl = url.split('?code=');

      // alert('<LoginGithubWithServer /> hasCode url: ', url);

      window.history.pushState({}, null, newUrl[0]);
      setAuthGhData({ ...authGhData, isLoading: true });

      const requestData = {
        clientIdGithub,
        clientSecretGithub,
        redirectUri,
        code: newUrl[1],
      };

      console.info('requestData: ', requestData);

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(`${proxyUrl}/authenticate`, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          console.info('Successful login data: ', data);

          const {
            login,
            id,
            avatar_url: avatarUrl,
            public_repos: publicRepos,
          } = JSON.parse(data);

          const userData = {
            login,
            id,
            avatarUrl,
            publicRepos,
          };

          authDispatch({
            type: 'SIGN_IN',
            payload: userData,
          });
        })
        .catch(err => {
          console.info('err: ', err);
          setAuthGhData({
            isLoading: false,
            errorMessage: `Sorry! Login failed! Error: ${'err'}`,
          });
        });
    }
  }, [authGhData, authDispatch]);

  // console.info('clientIdGithub:', clientIdGithub, 'redirectUri: ', redirectUri);

  const handleOnClick = () => {
    setAuthGhData({ ...authGhData, isLoading: true });
  };

  if (isAuthenticated) {
    // console.info('<LoginGithubWithServer /> isAuthenticated');
    console.info('isAuthenticated... Redirect to="/"');
    return <Redirect to="/" />;
    // return <div>Authenticated already (redirect?)</div>;
  }

  return (
    <section className={styles.wrapper}>
      <div>
        <h1>Welcome</h1>
        <span className={styles.title}>Super amazing app</span>
        <span className={styles.errorMessage}>{authGhData.errorMessage}</span>
        <div className={styles.loginWrapper}>
          {authGhData.isLoading ? (
            <div className={styles.loadingWrapper}>
              <div className={styles.loader} />
            </div>
          ) : (
            <>
              <a
                href={`https://github.com/login/oauth/authorize?scope=${scope}&client_id=${clientIdGithub}&redirect_uri=${redirectUri}`}
                onClick={handleOnClick}
                className={styles.loginLink}
              >
                <GithubIcon style={{ width: '42px', height: '42px' }} />
                <span>Login with Github</span>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
