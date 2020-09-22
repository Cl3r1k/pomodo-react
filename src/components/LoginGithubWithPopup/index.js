import React, { useState, useEffect } from 'react';

// Hooks
// import { useAuthState } from 'hooks/useAuthState';

// Utils
import { combineToQuery } from 'services/utils';
import { PopupWindow } from 'classes/PopupWindow';

// Constants
import { clientIdGithub, redirectUri, scope } from 'constants/api.config';

// Styles
import styles from './styles.module.scss';

export const LoginGithubWithPopup = () => {
  const [authGhData, setAuthGhData] = useState({
    isLoading: false,
    errorMessage: '',
  });

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

  const handleSuccessAuth = data => {
    console.info('handleSuccessAuth() popup.then() data: ', data);
  };

  const handleErrorAuth = error => {
    console.info('handleErrorAuth() popup.then() error: ', error);
    setAuthGhData({
      isLoading: false,
      errorMessage: `Login failed: error: ${error}`,
    });
  };

  // TODO: Used example https://github.com/checkr/react-github-login/blob/master/src/GitHubLogin.js
  // Replication: https://codesandbox.io/s/festive-mclaren-ovr4f?file=/src/PopupWindow.js
  const handleOnClickLogin = () => {
    console.info('handleOnClickLogin() called');

    setAuthGhData({ isLoading: true });

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
      data => handleSuccessAuth(data),
      error => handleErrorAuth(error)
    );
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={handleOnClickLogin}>
        Login (iframe) with GitHub
      </button>
      <div>isLoading: {authGhData.isLoading ? 'true' : 'false'}</div>
      {authGhData.errorMessage && (
        <div>ErrorMessage: {authGhData.errorMessage}</div>
      )}
    </div>
  );
};
