import { gql } from 'graphql-request';

export const USER_ACTIVITY_UPDATE_MUTATION = (collection: string, userId: string) => ({
  query: gql`
    mutation UserActivityUpdate($input: UserActivityUpdateInput) {
      userActivityUpdate(input: $input) {
        collection
        current {
          timestamp
        }
        previous {
          timestamp
        }
      }
    }
  `,
  input: {
    input: {
      collection,
      userId,
    },
  },
});

export const USER_ACTIVITY_QUERY = (collection: string, userId: string) => ({
  query: gql`
    query ($filter: UserActivityFilter) {
      userActivity(filter: $filter) {
        collection
        data
        lastVisit
        userId
      }
    }
  `,
  filter: {
    filter: {
      collection,
      userId,
    },
  },
});
