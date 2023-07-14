import type { BudgetStatus } from './types';
import type { BaseUser, User } from './users';

export interface BudgetStatementComment {
  id: string;
  budgetStatementId: string;
  timestamp: string;
  comment: string;
  status: BudgetStatus;
  author: User | BaseUser;
}
