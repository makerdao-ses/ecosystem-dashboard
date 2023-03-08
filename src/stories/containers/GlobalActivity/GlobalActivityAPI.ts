import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '../../../core/models/dto/coreUnitDTO';

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

export const fetchCoreUnitsWithActivities = async () => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CUS_WITH_ACTIVITY)) as { coreUnits: CoreUnitDto[] };
  return res.coreUnits;
};
