import { gql, request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';

export const GETCoreUnits = gql`
    query CoreUnits {
      coreUnits {
        id
        shortCode
        code
        name
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
        roadMap {
          ownerCuId
          roadmapStatus
        }
        socialMediaChannels {
          forumTag
          twitter
          youtube
          discord
          linkedIn
          website
        }
        budgetStatements {
          month
          budgetStatementFTEs {
            month
            ftes
          }
          budgetStatus,
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
          jobTitle,
          contributor {
            discordHandle
            email
            facilitatorImage
            forumHandle
            githubUrl
            name
          }
        }
      }
    }
  `;

export const fetchCoreUnits = async() => {
  const result = await request(GRAPHQL_ENDPOINT, GETCoreUnits);
  return result.coreUnits;
};
