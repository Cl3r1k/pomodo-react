import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Styles
import styles from './App.module.scss';

export const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={styles['App-link']}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Router>
  );
};
