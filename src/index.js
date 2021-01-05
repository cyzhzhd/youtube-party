import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
);
