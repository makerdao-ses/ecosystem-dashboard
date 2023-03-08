import { gql } from 'graphql-request';

export const CREATE_ACCOUNT_REQUEST = (username: string, password: string) => ({
  query: gql`
    mutation UserCreate($input: UserInput) {
      userCreate(input: $input) {
        username
        active
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
