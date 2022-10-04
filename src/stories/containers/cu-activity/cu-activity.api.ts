import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export const GET_CU_ACTIVITY_BY_CODE = gql`
  query CoreUnit($filter: CoreUnitFilter) {
    coreUnit(filter: $filter) {
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
  })) as { coreUnit: CoreUnitDto[] };
  return res.coreUnit[0];
};
