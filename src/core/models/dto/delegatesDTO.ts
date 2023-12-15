import type { ChangeTrackingEvent } from '../interfaces/activity';
import type { BudgetStatement } from '../interfaces/budgetStatement';
import type { ResourceType } from '../interfaces/types';

export interface DelegatesDto {
  id: string;
  shortCode: string;
  code: string;
  type: ResourceType;
  budgetStatements: BudgetStatement[];
  activityFeed: ChangeTrackingEvent[];
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
  actuals: number;
}
