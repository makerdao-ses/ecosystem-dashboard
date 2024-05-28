import { gql, request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';

export const GETCoreUnits = gql`
  query CoreUnits {
    coreUnits {
      id
      shortCode
      code
      name
      status
      image
      category
      cuMip {
        mipStatus
        mipUrl
        formalSubmission
        accepted
        rfc
        rejected
        obsolete
        mipCode
        mip40 {
          mkrOnly
          mip40BudgetPeriod {
            budgetPeriodStart
            budgetPeriodEnd
          }
          mip40Wallet {
            mip40BudgetLineItem {
              budgetCap
            }
          }
        }
        mip41 {
          contributorId
          contributor {
            id
            name
            forumHandle
            discordHandle
            twitterHandle
            email
            facilitatorImage
          }
        }
      }
      socialMediaChannels {
        forumTag
        twitter
        youtube
        discord
        linkedIn
        website
        github
      }
      budgetStatements {
        month
        budgetStatementFTEs {
          month
          ftes
        }
        status
        budgetStatementWallet {
          budgetStatementLineItem {
            actual
            month
          }
        }
      }
      contributorCommitment {
        cuCode
        commitment
        startDate
        jobTitle
        contributor {
          discordHandle
          email
          facilitatorImage
          forumHandle
          githubUrl
          name
        }
      }
      lastActivity {
        id
        created_at
        event
        params
        description
      }
    }
  }
`;

export const fetchCoreUnits = async () => {
  const result = await request<{ coreUnits: CoreUnitDto[] }>(GRAPHQL_ENDPOINT, GETCoreUnits);
  return result.coreUnits.filter((cu) => cu.shortCode !== 'DEL');
};
