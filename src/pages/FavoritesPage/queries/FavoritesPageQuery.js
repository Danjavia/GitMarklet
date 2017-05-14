import gql from 'graphql-tag';

export default gql`
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
