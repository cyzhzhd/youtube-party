import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import cache, { jwtVar } from './cache';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_HOST,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: jwtVar() ? `Bearer ${jwtVar()}` : '',
  },
}));
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
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
