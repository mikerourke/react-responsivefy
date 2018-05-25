import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
