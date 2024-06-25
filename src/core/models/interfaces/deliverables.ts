import type { OwnerRef, Progress } from './roadmaps';

export interface KeyResult {
  id: string;
  title: string;
  link: string;
}

export enum DeliverableStatus {
  WONT_DO = 'WONT_DO',
  DRAFT = 'DRAFT',
  TODO = 'TODO',
  BLOCKED = 'BLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
}

export interface BudgetAnchorProject {
  project: string;
  workUnitBudget: number;
  deliverableBudget: number;
}

export interface Deliverable {
  id: string;
  title: string;

  code: string;
  description: string;
  keyResults: KeyResult[];

  status: DeliverableStatus;
  workProgress: Progress;

  owner: OwnerRef;
  budgetAnchor: BudgetAnchorProject;
}
