import gql from 'graphql-tag';

export default gql`    
  query Github ($username: String!) {
    github {
      user(username: "danjavia") {
        login
        id
        avatar_url
        repos {
          id
          name
        }
      }
    }
  }
`;
