import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Pages
import { HomePage } from 'pages/HomePage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';

// Styles
import styles from './App.module.scss';

export const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="/about">About Page</Link>
              </li>
              <li>
                <Link to="/not-found">Not Found Page</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
