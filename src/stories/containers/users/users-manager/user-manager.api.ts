import { gql } from 'graphql-request';

export const QUERY_USERS = gql`
  query Users {
    users {
      id
      username
      active
      roles {
        id
        name
        permissions
      }
    }
  }
`;
