/**
 * External Resources
 **/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

/**
 * Internal Resources
 **/
import Routes from './routes/routes';

import 'antd/dist/antd.css';
import './index.css';

/**
 * `client`: Set apollo client connection
 **/
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
});

console.log(process.env.REACT_APP_GITHUB_TOKEN);

/**
 * `Render`: Render application
 **/
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
