import { gql } from 'graphql-request';

export const QUERY_USERS = () => ({
  query: gql`
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
  `,
});
