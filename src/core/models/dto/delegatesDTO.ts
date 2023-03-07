import type { ActivityFeedDto, BudgetStatementDto } from './coreUnitDTO';

export interface DelegatesDto {
  id: string;
  shortCode: string;
  code: string;
  budgetStatements: BudgetStatementDto[];
  activityFeed: ActivityFeedDto[];
}
