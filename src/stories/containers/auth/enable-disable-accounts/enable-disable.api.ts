import { gql } from 'graphql-request';

export const ENABLE_DISABLE_USER_REQUEST = (active: boolean, id: string) => ({
  query: gql`
    mutation UserSetActiveFlag($input: UserSetActiveFlag) {
      userSetActiveFlag(input: $input) {
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
  input: {
    input: {
      active,
      id,
    },
  },
});
