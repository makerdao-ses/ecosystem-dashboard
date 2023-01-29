import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export const GET_CUS_WITH_ACTIVITY = gql`
  query CoreUnits {
    coreUnits {
      id
      shortCode
      code
      name
      image
      category
      sentenceDescription
      activityFeed {
        id
        created_at
        event
        params
        description
      }
      socialMediaChannels {
        discord
        forumTag
        linkedIn
        twitter
        website
        youtube
        github
      }
    }
  }
`;

export const GET_ACTIVITIES = (offset: number, limit: number, coreUnitId?: number | string) => ({
  query: gql`
    query ActivityFeed($offset: Int, $limit: Int, $filter: ActivityFeedFilter) {
      activityFeed(offset: $offset, limit: $limit, filter: $filter) {
        created_at
        description
        event
        id
        params
      }
    }
  `,
  filter: {
    offset,
    limit,
    ...(coreUnitId
      ? {
          filter: {
            objectType: 'CoreUnit',
            objectId: coreUnitId.toString(),
          },
        }
      : {
          filter: null,
        }),
  },
});
export const fetchCoreUnitsWithActivities = async () => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CUS_WITH_ACTIVITY)) as { coreUnits: CoreUnitDto[] };
  return res.coreUnits;
};

export const fetchActivities = async (offset: number, limit: number, coreUnitId?: number | string) => {
  const { query, filter } = GET_ACTIVITIES(offset, limit, coreUnitId);
  const res = await request(GRAPHQL_ENDPOINT, query, filter);
  return res.activityFeed;
};
