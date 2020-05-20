import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './services/serviceWorker.js';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './pages/app/App.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
