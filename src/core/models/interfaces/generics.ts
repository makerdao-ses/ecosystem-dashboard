import type { ChangeTrackingEvent } from './activity';
import type { BudgetStatement } from './budgetStatement';

export interface WithBudgetStatement {
  budgetStatements: BudgetStatement[];
}

export interface WithActivityFeed {
  activityFeed: ChangeTrackingEvent[];
}

export type Maybe<T> = T | null;
