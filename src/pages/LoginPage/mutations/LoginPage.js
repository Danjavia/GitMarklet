/**
 * External resources
 * */
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import LoginPage from '../LoginPage';

/**
 * signinUser
 * */
const signinUser = gql`
  mutation SigninUser(
    $email: String!,
    $password: String!
  ) {
    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token
      user {
        id
        username
      }
    }
  }
`;

/**
 * createPaymentForm
 * */
const LoginPageForm = graphql(signinUser)(LoginPage);

export default LoginPageForm;
