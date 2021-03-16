import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import cache from './cache';

const client = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_GRAPHQL_API_HOST,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
