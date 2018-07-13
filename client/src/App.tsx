import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
