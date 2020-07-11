import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Routes
import { PrivateRoute } from 'routes/PrivateRoute';

// Pages
import { HomePage } from 'pages/HomePage';
import { AboutPage } from 'pages/AboutPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { LoginPage } from 'pages/LoginPage';

// Components
import { AuthStatus } from 'components/AuthStatus';
import { RenderCounter } from 'components/RenderCounter';

// Styles
import styles from './App.module.scss';

export const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <RenderCounter />

        <header className={styles['App-header']}>
          <AuthStatus />

          <nav>
            <ul>
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="/about">About Page</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
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
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <DashboardPage />
          </PrivateRoute>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
