import gql from 'graphql-tag';

const allFavoritesSubscription = gql`
  subscription Favorites($id: ID!) {
    Favorite(filter: {
      mutation_in: [CREATED]
      node: {
        user: {
          id: $id
        }
      }
    }) {
      node {
        id
        name
        description
        url
        primaryLanguage
      }
    }
  }
`;

const allFavorites = gql`
  query AllFavorites($id: ID!) {
    User(id: $id) {
      favorites(orderBy: createdAt_DESC) {
        id
        name
        description
        url
        primaryLanguage
      }
    }
  }
`;

export {
  allFavoritesSubscription,
  allFavorites
}
