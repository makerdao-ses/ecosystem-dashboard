import { gql, request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';

export const GETCoreUnits = gql`
    query CoreUnits {
      coreUnits {
        id
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
            facilitatorName
            contributorId
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
            }
          }
        }
      }
    }
  `;

const GetFacilitatorImageGQL = gql`
  query CoreUnits($filter: ContributorFilter) {
    contributor(filter: $filter) {
      id
      name
      facilitatorImage
    }
  }
  `;

export const fetchCoreUnits = async() => {
  const result = await request(GRAPHQL_ENDPOINT, GETCoreUnits);
  return result.coreUnits;
};

export const fetchFacilitatorImage = async(id: string) => {
  if (!id) return null;

  try {
    const result = await request(GRAPHQL_ENDPOINT, GetFacilitatorImageGQL, {
      filter: {
        id
      }
    });

    return result.contributor[0];
  } catch (e) {
    console.log(`Couldn't get image for facilitator with Id ${id} ${e}`);
  }
};
