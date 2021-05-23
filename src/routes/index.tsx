import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/forget-password" exact component={ForgetPassword} />
  </Switch>
);

export default Routes;
