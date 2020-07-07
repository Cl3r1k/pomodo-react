import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Pages
import { HomePage } from 'pages/HomePage';
import { NotFoundPage } from 'pages/NotFoundPage';

// Styles
import styles from './App.module.scss';

export const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <ul>
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/not-found">Not Found Page</Link>
            </li>
          </ul>
        </header>

        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
