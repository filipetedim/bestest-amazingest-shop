import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Common Routes
import NotFound from './screens/NotFound';

export default () => (
  <Switch>
    <Route component={NotFound} />
  </Switch>
);
