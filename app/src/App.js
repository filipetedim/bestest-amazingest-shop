import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Theme
import './App.css';

// Routes
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
