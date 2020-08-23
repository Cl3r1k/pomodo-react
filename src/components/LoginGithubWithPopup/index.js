import React from 'react';

// Hooks
import { useAuthState } from 'hooks/useAuthState';

// Utils
import { combineToQuery } from 'services/utils';
import { PopupWindow } from 'classes/PopupWindow';

// Styles
import styles from './styles.module.scss';

export const LoginGithubWithPopup = () => {
  const { clientId, redirectUri } = useAuthState();

  // TODO: Used example https://github.com/checkr/react-github-login/blob/master/src/GitHubLogin.js
  // Replication: https://codesandbox.io/s/festive-mclaren-ovr4f?file=/src/PopupWindow.js
  const handleOnClickLogin = () => {
    console.info('handleOnClickLogin() called');

    const scope = 'user:email';
    const queryParams = combineToQuery({
      scope,
      client_id: clientId,
      redirect_uri: redirectUri,
    });

    console.info('queryParams: ', queryParams);

    const popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${queryParams}`,
      { height: 800, width: 600 }
    );

    console.info('popup: ', popup);

    popup.then(
      data => console.info('popup.then() data: ', data),
      error => console.info('popup.then() error: ', error)
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
