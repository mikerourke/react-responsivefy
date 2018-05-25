import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './index.css';

render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
