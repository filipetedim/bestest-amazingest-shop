import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Common Routes
import Products from './screens/Products';
import NotFound from './screens/NotFound';

export default () => (
  <Switch>
    <Route exact path="/products" component={Products} />
    <Route component={NotFound} />
  </Switch>
);
