export type Commitment = 'FullTime' | 'PartTime' | 'Variable' | 'Inactive';

export interface Contributor {
  id: string;
  name: string;
  forumHandle: string;
  discordHandle: string;
  twitterHandle: string;
  email: string;
  facilitatorImage: string;
  githubUrl: string;
}

export interface ContributorCommitment {
  id: string;
  cuId: string;
  contributorId: string;
  startDate: string;
  commitment: Commitment;
  cuCode: string;
  contributor: Contributor[];
  jobTitle: string;
}

export interface CuGithubContribution {
  id: string;
  cuId: string;
  orgId: string;
  repoId: string;
  githubOrg: string;
  githubRepo: string;
}
