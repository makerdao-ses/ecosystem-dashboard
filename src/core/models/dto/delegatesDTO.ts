import type { ActivityFeedDto, BudgetStatementDto } from './coreUnitDTO';

export interface DelegatesDto {
  id: string;
  shortCode: string;
  code: string;
  budgetStatements: BudgetStatementDto[];
  activityFeed: ActivityFeedDto[];
}

export interface DelegateSocialDto {
  [key: string]: string | undefined;
  forumProfile?: string;
  forumPlatform?: string;
  youtube?: string;
  votingPortal?: string;
  twitter?: string;
}

export interface RecognizedDelegatesDto {
  name: string;
  image: string;
  latestVotingContract: string;
  socials: DelegateSocialDto;
}
