import React from 'react';
import ReactDOM from 'react-dom';

// Components
import { App } from 'App';

// Modules
import * as serviceWorker from './serviceWorker';

// Styles
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
