/**
 * External resources
 * */
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import DashboardPage from '../DashboardPage';

/**
 * createFavorite
 * */
const createFavorite = gql`
  mutation CreateFavorite(
    $userId: ID!,
    $name: String!,
    $description: String,
    $url: String!,
    $primaryLanguage: Json
  ) {
    createFavorite(
      userId: $userId
      name: $name,
      description: $description,
      url: $url,
      primaryLanguage: $primaryLanguage
    ) {
      id
      name
      description
      url
      primaryLanguage
    }
  }
`;

/**
 * DashboardPageForm
 * */
const DashboardPageForm = graphql(createFavorite)(DashboardPage);

export default DashboardPageForm;
