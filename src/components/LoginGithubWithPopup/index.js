import React, { useEffect } from 'react';

// Hooks
import { useAuthState } from 'hooks/useAuthState';

// Utils
import { combineToQuery } from 'services/utils';
import { PopupWindow } from 'classes/PopupWindow';

// Constants
import { clientId, redirectUri } from 'constants/api.config';

// Styles
import styles from './styles.module.scss';

export const LoginGithubWithPopup = () => {
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

  const { scope } = useAuthState();

  // TODO: Used example https://github.com/checkr/react-github-login/blob/master/src/GitHubLogin.js
  // Replication: https://codesandbox.io/s/festive-mclaren-ovr4f?file=/src/PopupWindow.js
  const handleOnClickLogin = () => {
    console.info('handleOnClickLogin() called');

    const queryParams = combineToQuery({
      scope,
      client_id: clientId,
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
      data => console.info('popup.then() data: ', data), // Here we can perform request throw proxy-server
      error => console.info('popup.then() error: ', error) // Here we can process error, and reset loading process, or show error
    );
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={handleOnClickLogin}>
        Login (iframe) with GitHub
      </button>
    </div>
  );
};
