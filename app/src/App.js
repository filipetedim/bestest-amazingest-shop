import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Theme
import './App.css';

// Routes
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Routes />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
