import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';

export const GET_CONTRIBUTORS = gql`
  query ContributorCommitment($filter: ContributorCommitmentFilter) {
    contributorCommitment(filter: $filter) {
      id
      jobTitle
      commitment
      contributor {
        id
        name
        email
        forumHandle
        forumHandle
        discordHandle
        facilitatorImage
      }
    }
  }
`;
export enum Commitment {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Variable = 'Variable',
  Inactive = 'Inactive',
}
export interface Contributor {
  id: string;
  name: string;
  forumHandle: string;
  discordHandle: string;
  twitterHandle: string;
  email: string;
  facilitatorImage: string;
}
export interface ContributorCommitment {
  id: string;
  jobTitle: string;
  commitment: Commitment;
  contributor: Contributor[];
}

interface PropsContributors {
  cuId: string;
}

export const fetchContributors = async({ cuId }: PropsContributors) => {
  const data = await request(GRAPHQL_ENDPOINT, GET_CONTRIBUTORS, {
    filter: {
      cuId,
    },
  });
  return (data.contributorCommitment as ContributorCommitment[]) || [];
};
