import { gql } from 'graphql-request';

export const LOGIN_REQUEST = (username: string, password: string) => ({
  query: gql`
    mutation UserLogin($input: AuthInput!) {
      userLogin(input: $input) {
        user {
          id
          username
          active
          roles {
            id
            name
            permissions
          }
        }
        authToken
      }
    }
  `,
  input: {
    input: {
      username,
      password,
    },
  },
});
