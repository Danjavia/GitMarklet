/**
 * External Resources
 **/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import StorageManager from './services/StorageManager';

/**
 * Internal Resources
 **/
import Routes from './routes/routes';

import 'antd/dist/antd.css';
import './index.css';



class AuthMiddleware {
  applyMiddleware(req, next) {

    const token = StorageManager.get('access_token') || null;

    if (token) {

      if (!req.options.headers) {
        req.options.headers = {};
      }

      req.options.headers.Authorization = 'Bearer ' + token;
    }

    next();
  }
}

const networkInterface = createNetworkInterface({uri: process.env.REACT_APP_GRAPHQL_ENDPOINT});

networkInterface.use([
  new AuthMiddleware(),
]);

/**
 * `client`: Set apollo client connection
 **/
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id
    }
    return null
  },
});

// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT }),
// });

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
