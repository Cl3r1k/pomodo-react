import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Hooks
import { useAuthState } from 'hooks/useAuthState';
// import { useAuthDispatch } from 'hooks/useAuthDispatch';

export const LoginGithub = () => {
  const {
    isAuthenticated,
    clientId,
    clientSecret,
    redirectUri,
    proxyUrl,
  } = useAuthState();
  // const authDispatch = useAuthDispatch();
  const [authGhData, setAuthGhData] = useState({
    errorMessage: '',
    isLoading: false,
  });

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, null, newUrl[0]);
      setAuthGhData({ ...authGhData, isLoading: true });

      const requestData = {
        client_id: clientId,
        redirect_uri: redirectUri,
        client_secret: clientSecret,
        code: newUrl[1],
      };

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxyUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          console.info('data: ', data);
          // authDispatch({
          //   type: 'SIGN_IN',
          //   payload: { user: data },
          // });
        })
        .catch(err => {
          console.info('err: ', err);
          setAuthGhData({
            isLoading: false,
            errorMessage: `Sorry! Login failed! Error: ${'err'}`,
          });
        });
    }
  }, [authGhData, clientId, clientSecret, proxyUrl, redirectUri]);

  // console.info('clientId:', clientId, 'redirectUri: ', redirectUri);

  if (isAuthenticated) {
    // console.info('<LoginGithub /> isAuthenticated');
    return <Redirect to="/" />;
  }

  return <div>Login Github</div>;
};
