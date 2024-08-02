import type { BudgetStatus, ResourceType } from './types';

export interface ChangeTrackingParams {
  coreUnit?: {
    id: number;
    code: string;
    shortCode: string;
  };
  owner?: {
    id: number;
    code: string;
    shortCode: string;
    type: ResourceType;
  };
  budgetStatementId?: number;
  month?: string;

  author?: {
    id: number;
    username: string;
  };
  commentId?: number;
  status?: {
    old: BudgetStatus;
    new: BudgetStatus;
  };
}

export interface ChangeTrackingEvent {
  id: string;
  created_at: string;
  update_at?: string;
  event: string;
  params: ChangeTrackingParams;
  description: string;
}
