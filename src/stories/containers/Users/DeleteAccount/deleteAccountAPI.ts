import { gql } from 'graphql-request';

export const USERS_DELETE_FROM_ADMIN = (userId: string) => ({
  query: gql`
    mutation UserDelete($filter: UserDelete) {
      userDelete(filter: $filter) {
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
  filter: {
    filter: {
      id: userId,
    },
  },
});
