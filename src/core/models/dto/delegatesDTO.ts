import type { ActivityFeedDto, BudgetStatementDto } from './coreUnitDTO';

export interface DelegatesReportDto {
  id: string;
  shortCode: string;
  code: string;
  budgetStatements: BudgetStatementDto[];
  activityFeed: ActivityFeedDto[];
}
