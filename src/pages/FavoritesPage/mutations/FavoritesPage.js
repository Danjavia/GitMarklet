/**
 * External resources
 * */
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import FavoritesPage from '../FavoritesPage';

/**
 * deleteFavorite
 * */
const deleteFavorite = gql`  
  mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id) {
      name
    }
  }
`;

/**
 * FavoritesPageForm
 * */
const FavoritesPageForm = graphql(deleteFavorite)(FavoritesPage);

export default FavoritesPageForm;
