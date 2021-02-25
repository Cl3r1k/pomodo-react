import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Hooks
import { SwitchRoutes } from '@routes/SwitchRoutes';

// Components
import { NavBar } from '@components/NavBar';
import { RenderCounter } from '@components/RenderCounter';

// Styles
import styles from './App.module.scss';

export const App: React.FC = () => (
  <Router>
    <div className={styles.appContainer}>
      <RenderCounter />

      <header className={styles.headerContainer}>
        <NavBar />
      </header>

      <main className={styles.mainContainer}>
        <SwitchRoutes />
      </main>

      <footer className={styles.footerContainer}>Some footer</footer>
    </div>
  </Router>
);
