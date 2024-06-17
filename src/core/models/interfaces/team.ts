import type { ChangeTrackingEvent } from './activity';
import type { BudgetStatement } from './budgetStatement';
import type { ContributorCommitment, CuGithubContribution } from './contributor';
import type { Scope } from './scopes';
import type { SocialMediaChannels } from './socialMedia';
import type { ResourceType, TeamStatus } from './types';
import type { Auditor, User } from './users';

export interface TeamUpdate {
  id: string;
  cuId: string;
  updateTitle: string;
  updateDate: string;
  updateUrl: string;
}

export interface Team {
  id: string;
  code: string;
  shortCode: string;
  name: string;
  status: TeamStatus;
  image: string;
  budgetPath: string;
  category: string[];
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  lastActivity: ChangeTrackingEvent;
  legacyBudgetStatementUrl: string;
  budgetId: string;
  type: ResourceType;
  auditors: (User | Auditor)[];
  socialMediaChannels: SocialMediaChannels[];
  contributorCommitment: ContributorCommitment[];
  cuGithubContribution: CuGithubContribution[];
  updates: TeamUpdate[];
  scopes: Scope[];
  budgetStatements: BudgetStatement[];
  cuMip: null;
}
