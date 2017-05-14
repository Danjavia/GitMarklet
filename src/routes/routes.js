/**
 * External libraries
 **/
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * Internal Resources
 **/
import HomePage from '../pages/HomePage/HomePage';
import VehicleTypePage from '../pages/VehicleTypePage/VehicleTypePage';
import Footer from '../components/Footer/Footer';
import NotFound from '../pages/NotFound/NotFound';

/**
 * Router class definition.
 **/
export default () => (
  <div className="container">

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/tipo-vehiculo" component={VehicleTypePage} />
      <Route component={NotFound} />
    </Switch>

    <Footer />
  </div>
);