import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';

// Theme
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

// App
import App from './App';

// Utils
import History from './utils/history';

ReactDOM.render(
  <Router history={History}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
