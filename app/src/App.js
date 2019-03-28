import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Routes
import Routes from './Routes';

// Containers
import Header from './containers/Header';

// Services
import IpstackService from './services/externalServices';

class App extends Component {
  render() {
    IpstackService.getIpstackLocale().then(response => {
      console.log(response);
    });

    return (
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
