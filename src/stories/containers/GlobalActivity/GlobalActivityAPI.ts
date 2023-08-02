import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Team } from '@ses/core/models/interfaces/team';

export const getGlobalActivityFeedQuery = () => ({
  query: gql`
    query GlobalActivityFeed($limit: Int, $offset: Int) {
      activityFeed(limit: $limit, offset: $offset) {
        created_at
        description
        event
        id
        params
      }
      teams {
        id
        shortCode
        name
        image
        type
      }
    }
  `,
  filter: {
    limit: 500,
    offset: 0,
  },
});

interface GlobalActivityFeedResponse {
  teams: Partial<Team>[];
  activityFeed: ChangeTrackingEvent[];
}

export const fetchGlobalActivityFeedData = async (): Promise<GlobalActivityFeedResponse> => {
  const { query, filter } = getGlobalActivityFeedQuery();
  const response = (await request(GRAPHQL_ENDPOINT, query, filter)) as GlobalActivityFeedResponse;

  return response;
};
