import { gql, request } from 'graphql-request';
import { GraphQLEndpoint } from '../../../config/endpoints';

export const GETCoreUnits = gql`
    query CoreUnits {
      coreUnits {
        id
        code
        name
        image
        cuMip {
          formalSubmission
          mipStatus
          accepted
          rfc
          rejected
          obsolete
          mip41 {
            facilitatorName
            contributorId
          }
        }
        roadMap {
          ownerCuId
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
          budgetStatementFTEs {
            month
            ftes
          }
          budgetStatus
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

export interface cuMipDao {
  mipStatus: string,
  accepted: string,
  formalSubmission: string,
  rfc: string,
  rejected: string,
  obsolete: string,
  mip41: {
    facilitatorName: string,
    contributorId: string
  }[]
}

export interface CoreUnitDAO {
  id: string,
  code: string,
  name: string,
  image: string,
  cuMip: cuMipDao[]
  roadMap: {
    ownerCuId: string
  }[],
  socialMediaChannels: {
    forumTag: string,
    twitter: string,
    youtube: string,
    discord: string,
    linkedIn: string,
    website: string,
  }[],
  budgetStatements: {
    budgetStatus: string,
    budgetStatementFTEs: {
      month: string,
      ftes: number
    }[]
  }[]
}

export const fetchCoreUnits = async() => {
  const result = await request(GraphQLEndpoint, GETCoreUnits);
  return result.coreUnits;
};

export const fetchFacilitatorImage = async(id: string) => {
  if (!id) return null;

  try {
    const result = await request(GraphQLEndpoint, GetFacilitatorImageGQL, {
      filter: {
        id
      }
    });

    return result.contributor[0];
  } catch (e) {
    console.log(`Couldn't get image for facilitator with Id ${id} ${e}`);
  }
};
