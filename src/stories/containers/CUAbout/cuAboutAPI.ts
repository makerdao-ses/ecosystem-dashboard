import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '../../../core/models/dto/coreUnitDTO';

export const GET_CU_ABOUT_BY_CODE = gql`
  query CoreUnits($filter: CoreUnitFilter) {
    coreUnits(filter: $filter) {
      id
      shortCode
      code
      name
      image
      category
      sentenceDescription
      paragraphDescription
      paragraphImage
      auditors {
        id
        username
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
      cuMip {
        mipTitle
        mipStatus
        accepted
        obsolete
        rejected
        rfc
        formalSubmission
        mipUrl
      }
      budgetStatements {
        budgetStatementFTEs {
          ftes
          month
        }
      }
      contributorCommitment {
        jobTitle
        commitment
        startDate
        contributor {
          name
          discordHandle
          email
          facilitatorImage
          forumHandle
          twitterHandle
        }
      }
    }
  }
`;

export const fetchCoreUnitByCode = async (shortCode: string) => {
  const res = (await request(GRAPHQL_ENDPOINT, GET_CU_ABOUT_BY_CODE, {
    filter: {
      shortCode,
    },
  })) as { coreUnits: CoreUnitDto[] };
  return res.coreUnits[0];
};
