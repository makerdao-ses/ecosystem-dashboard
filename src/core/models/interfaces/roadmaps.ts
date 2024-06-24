export enum DeliverableStatus {
  WONT_DO = 'WONT_DO',
  DRAFT = 'DRAFT',
  BLOCKED = 'BLOCKED',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
}

export interface StoryPoints {
  total: number;
  completed: number;
}

export interface Percentage {
  value: number;
}

export interface KeyResult {
  id: string;
  title: string;
  link: string;
}

export type Progress = StoryPoints | Percentage;

export interface DeliverablesCompleted {
  total: number;
  completed: number;
}

export interface OwnerRef {
  ref: string;
  id: string;
  name: string;
  code: string;
  imageUrl: string;
}

export enum DeliverableSetStatus {
  DRAFT = 'DRAFT',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
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

export interface DeliverableSet {
  deliverables: Deliverable[];
  status: DeliverableSetStatus;
  progress: Progress;
  deliverablesCompleted: DeliverablesCompleted;
}

export interface Milestone {
  id: string;
  code: string;
  title: string;
  abstract: string;
  description: string;
  targetDate: string;

  scope: DeliverableSet[];

  coordinators: OwnerRef[];
  contributors: OwnerRef[];
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  description: string;

  milestones: Milestone[];
}

export const isPercentage = (progress: Progress): progress is Percentage =>
  (progress as Percentage).value !== undefined;

export const isStoryPoints = (progress: Progress): progress is StoryPoints =>
  (progress as StoryPoints).total !== undefined;
