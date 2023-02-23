import type { ActivityFeedDto, BudgetStatementDto } from './core-unit.dto';

export interface DelegatesDto {
  id: string;
  shortCode: string;
  code: string;
  budgetStatements: BudgetStatementDto[];
  activityFeed: ActivityFeedDto[];
}
