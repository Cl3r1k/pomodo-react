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
      <div className={styles.appContainer}>
        <RenderCounter />

        <header className={styles.headerContainer}>
          <NavBar />
        </header>

        <main className={styles.mainContainer}>{routes}</main>

        <footer className={styles.footerContainer}>Some footer</footer>
      </div>
    </Router>
  );
};
