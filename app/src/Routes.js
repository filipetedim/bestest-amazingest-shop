import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Common Routes
import Products from './screens/Products';
import Product from './screens/Product';
import NotFound from './screens/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={Products} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/products/:productId" component={Product} />
    <Route component={NotFound} />
  </Switch>
);
