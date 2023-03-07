import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '../../../core/models/dto/coreUnitDTO';

export const GET_CU_ACTIVITY_BY_CODE = gql`
  query CoreUnits($filter: CoreUnitFilter) {
    coreUnits(filter: $filter) {
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

export const fetchCoreUnitWithActivitiesByCode = async (shortCode: string) => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CU_ACTIVITY_BY_CODE, {
    filter: {
      shortCode,
    },
  })) as { coreUnits: CoreUnitDto[] };
  return res.coreUnits[0];
};
