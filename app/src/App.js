import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Routes
import Routes from './Routes';

// Containers
import Header from './containers/Header';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
