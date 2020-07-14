import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Hooks
import { useRoutes } from 'routes/useRoutes';

// Components
import { NavBar } from 'components/NavBar';
import { RenderCounter } from 'components/RenderCounter';

// Styles
import styles from './App.module.scss';

export const App = () => {
  const routes = useRoutes();

  return (
    <Router>
      <div className={styles.App}>
        <RenderCounter />

        <header className={styles['App-header']}>
          <NavBar />
        </header>

        <main className={styles.mainContainer}>{routes}</main>

        <footer>Some footer</footer>
      </div>
    </Router>
  );
};
