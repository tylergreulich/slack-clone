import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/register" component={Register} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/logout" component={Logout} />
    </Switch>
  </BrowserRouter>
);
