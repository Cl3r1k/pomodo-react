import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import { PrivateRoute } from 'routes/PrivateRoute';

// Pages
import { HomePage } from 'pages/HomePage';
import { AboutPage } from 'pages/AboutPage';
import { DashboardPage } from 'pages/DashboardPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { LoginPage } from 'pages/LoginPage';

export const useRoutes = () => {
  return (
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
  );
};
