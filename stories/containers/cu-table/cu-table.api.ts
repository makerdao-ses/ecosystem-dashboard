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

export interface Mip40BudgetPeriodDao {
  budgetPeriodStart: string,
  budgetPeriodEnd: string
}

export interface Mip40BudgetLineItem {
  budgetCap: number;
}

export interface Mip40WalletDao {
  mip40BudgetLineItem: Mip40BudgetLineItem[]
}

export interface Mip40Dao {
  mip40BudgetPeriod: Mip40BudgetPeriodDao[]
  mip40Wallet: Mip40WalletDao[]
}

export interface Mip41Dao {
  facilitatorName: string,
  contributorId: string
}

export interface CuMipDao {
  mipStatus: string,
  mipUrl: string,
  accepted: string,
  formalSubmission: string,
  rfc: string,
  rejected: string,
  obsolete: string,
  mip40: Mip40Dao[]
  mip41: Mip41Dao[]
}

export interface BudgetStatementFteDao {
  month: string,
  ftes: number
}

export interface BudgetStatementLineItemDao {
  actual: number
}

export interface BudgetStatementWalletDao {
  budgetStatementLineItem: BudgetStatementLineItemDao[]
}

export interface BudgetStatementDao {
  month: string,
  budgetStatus: string,
  budgetStatementFTEs: BudgetStatementFteDao[],
  budgetStatementWallet: BudgetStatementWalletDao[]
}

export interface SocialMediaChannelDAO {
  forumTag: string,
  twitter: string,
  youtube: string,
  discord: string,
  linkedIn: string,
  website: string,
}

export interface RoadMapDao {
  ownerCuId: string
  roadmapStatus: string,
}

export interface CoreUnitDao {
  id: string,
  code: string,
  name: string,
  image: string,
  category: string[],
  cuMip: CuMipDao[]
  roadMap: RoadMapDao[],
  socialMediaChannels: SocialMediaChannelDAO[],
  budgetStatements: BudgetStatementDao[]
}

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
