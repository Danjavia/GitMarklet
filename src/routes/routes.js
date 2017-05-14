/**
 * External libraries
 **/
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * Internal Resources
 **/
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import Footer from '../components/Footer/Footer';
import NotFound from '../pages/NotFound/NotFound';

/**
 * Router class definition.
 **/
export default () => (
  <div className="container">

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>

    <Footer />
  </div>
);