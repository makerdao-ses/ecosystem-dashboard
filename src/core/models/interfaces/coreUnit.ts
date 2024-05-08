import type { ChangeTrackingEvent } from './activity';
import type { BudgetStatement } from './budgetStatement';
import type { ContributorCommitment } from './contributor';
import type { CuMip } from './cuMip';
import type { SocialMediaChannels } from './socialMedia';
import type { ResourceType } from './types';
import type { Auditor, User } from './users';

export interface CoreUnit {
  id: string;
  code: string;
  shortCode: string;
  name: string;
  image: string;
  budgetPath: string;
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  category: string[];
  legacyBudgetStatementUrl?: string;
  budgetId: string;
  type: ResourceType;
  auditors: (User | Auditor)[];
  cuMip: CuMip[];
  activityFeed: ChangeTrackingEvent[];
  lastActivity?: ChangeTrackingEvent;
  socialMediaChannels: SocialMediaChannels[];
  budgetStatements: BudgetStatement[];
  contributorCommitment: ContributorCommitment[];
}
