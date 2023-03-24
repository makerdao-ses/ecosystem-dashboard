import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { ActivityFeedDto } from '../../../core/models/dto/coreUnitDTO';

export const getCoreUnitActivityFeedQuery = (coreUnitId: string) => ({
  query: gql`
    query CUActivityFeed($limit: Int, $offset: Int, $filter: ActivityFeedFilter) {
      activityFeed(limit: $limit, offset: $offset, filter: $filter) {
        created_at
        description
        event
        id
        params
      }
    }
  `,
  filter: {
    limit: 500,
    offset: 0,
    filter: {
      objectId: coreUnitId,
      objectType: 'CoreUnit',
    },
  },
});

export const fetchCoreUnitActivityFeedData = async (coreUnitId: string): Promise<ActivityFeedDto[]> => {
  const { query, filter } = getCoreUnitActivityFeedQuery(coreUnitId);
  const res = (await request(GRAPHQL_ENDPOINT, query, filter)) as { activityFeed: ActivityFeedDto[] };
  return res.activityFeed;
};
