import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './map.scss';

// HMR
if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}

window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
