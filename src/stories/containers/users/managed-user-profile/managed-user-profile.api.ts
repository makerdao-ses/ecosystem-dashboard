import { gql } from 'graphql-request';

export const FETCH_USER_BY_USERNAME = (username: string) => ({
  query: gql`
    query Users($input: UsersFilter) {
      users(input: $input) {
        id
        active
        username
        roles {
          id
          name
          permissions
        }
      }
    }
  `,
  input: {
    input: {
      username,
    },
  },
});
