import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { ActivityFeedDto, CoreUnitDto } from '../../../core/models/dto/coreUnitDTO';

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
      coreUnits {
        id
        shortCode
        name
        image
      }
    }
  `,
  filter: {
    limit: 500,
    offset: 0,
  },
});

interface GlobalActivityFeedResponse {
  coreUnits: Partial<CoreUnitDto>[];
  activityFeed: ActivityFeedDto[];
}

export const fetchGlobalActivityFeedData = async (): Promise<GlobalActivityFeedResponse> => {
  const { query, filter } = getGlobalActivityFeedQuery();
  const response = (await request(GRAPHQL_ENDPOINT, query, filter)) as GlobalActivityFeedResponse;

  return response;
};
