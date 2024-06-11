import { request, gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

export const GET_CU_ABOUT_BY_CODE = gql`
  query CoreUnits($filter: CoreUnitFilter) {
    coreUnits(filter: $filter) {
      id
      shortCode
      code
      name
      status
      image
      category
      sentenceDescription
      paragraphDescription
      paragraphImage
      budgetPath
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
  })) as { coreUnits: CoreUnit[] };
  return res.coreUnits[0];
};
