import React, { useState, useEffect } from 'react';

// Hooks
import { useAuthState } from '@hooks/useAuthState';

// Utils
import { combineToQuery } from '@utils/common';
import { PopupWindow } from '@utils/PopupWindow';
import { TResolveData, TRejectError } from '@utils/types';

// Constants
import { config } from '@config/index';

// Styles
import styles from './styles.module.scss';

export const LoginGithubWithPopup: React.FC = () => {
  const { isAuthenticated } = useAuthState();
  const [authGhData, setAuthGhData] = useState({
    isLoading: false,
    errorMessage: '',
  });
  const { clientIdGithub, redirectUri, scope, proxyUrl } = config;

  useEffect(() => {
    // alert(
    //   '<LoginGithubWithPopup /> window.location.href: ',
    //   window.location.href
    // );

    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      // alert('<LoginGithubWithPopup /> hasCode url: ', url);
    }
  }, []);

  const handleSuccessAuth = ({ code }: TResolveData): void => {
    console.info('handleSuccessAuth() popup.then() code: ', code);
    // console.info('handleSuccessAuth() authGhData: ', authGhData);
    // Here we should use our proxy-server to perform 'login/oauth/access_token' request and then
    // change state if success or error
    if (code) {
      const requestData = {
        code,
        provider: 'github',
      };

      fetch(`${proxyUrl}/authenticate`, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          console.info('Successfull data: ', data);
          setAuthGhData({ isLoading: false, errorMessage: '' });
        })
        .catch((err: Error) => {
          console.info('Failed from proxyServer: err: ', err);
          setAuthGhData({
            isLoading: false,
            errorMessage: `Login failed (proxy): error: ${err.message}`,
          });
        });
    }
  };

  const handleErrorAuth = ({ error }: TRejectError): void => {
    console.info('handleErrorAuth() popup.then() error: ', error);
    // console.info('handleErrorAuth() authGhData: ', authGhData);
    setAuthGhData({
      isLoading: false,
      errorMessage: `Login failed: error: ${error}`,
    });
  };

  // TODO: Used example https://github.com/checkr/react-github-login/blob/master/src/GitHubLogin.js
  // Replication: https://codesandbox.io/s/festive-mclaren-ovr4f?file=/src/PopupWindow.js
  const handleOnClickLogin = (): void => {
    console.info('handleOnClickLogin() called');

    setAuthGhData({ ...authGhData, isLoading: true });

    console.info('authGhData: ', authGhData);

    const queryParams = combineToQuery({
      scope,
      client_id: clientIdGithub,
      redirect_uri: redirectUri,
    });

    console.info('queryParams: ', queryParams);

    const popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${queryParams}`,
      window,
      { height: 800, width: 600 }
    );

    console.info('popup: ', popup);

    popup.then(
      (data: TResolveData) => handleSuccessAuth(data),
      (error: TRejectError) => handleErrorAuth(error)
    );
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={handleOnClickLogin}
      >
        Login (iframe) with GitHub
      </button>
      <div className={styles.info}>
        isLoading: {authGhData.isLoading ? 'true' : 'false'}
      </div>
      {authGhData.errorMessage && (
        <div className={styles.error}>
          ErrorMessage: {authGhData.errorMessage}
        </div>
      )}
      <div className={styles.authText}>
        isAuthenticated: {isAuthenticated ? 'true' : 'false'}
      </div>
    </div>
  );
};
