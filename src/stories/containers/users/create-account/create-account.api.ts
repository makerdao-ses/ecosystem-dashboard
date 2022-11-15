import { gql } from 'graphql-request';

export const CREATE_ACCOUNT_REQUEST = (username: string, password: string, cuId: number) => ({
  query: gql`
    mutation UserCreate($input: UserInput) {
      userCreate(input: $input) {
        id
        username
        active
      }
    }
  `,
  input: {
    input: {
      username,
      password,
      cuId,
    },
  },
});
