import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);
