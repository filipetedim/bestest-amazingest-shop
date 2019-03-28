import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Routes
import Routes from './Routes';

// Containers
import Header from './containers/Header';

// Utils
import Currency from './utils/currencyParser';

class App extends Component {
  render() {
    Currency.setCurrency();

    return (
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
