/**
 * External resources
 * */
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import SignupPage from '../SignupPage';

/**
 * createUser
 * */
const createUser = gql`
  mutation CreateUser(
    $email: String!,
    $password: String!,
    $username: String!
  ) {
    createUser(username: $username, authProvider: {
      email: {
        email: $email,
        password: $password
      }
    }) {
      username
    }
  }
`;

/**
 * createPaymentForm
 * */
const SignupPageForm = graphql(createUser)(SignupPage);

export default SignupPageForm;
