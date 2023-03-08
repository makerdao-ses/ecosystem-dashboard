import { gql } from 'graphql-request';

export const UPDATE_PASSWORD_REQUEST = (username: string, password: string, newPassword: string) => ({
  query: gql`
    mutation UserUpdate($input: UpdatePassword!) {
      userChangePassword(input: $input) {
        id
        username
      }
    }
  `,
  input: {
    input: {
      username,
      password,
      newPassword,
    },
  },
});
