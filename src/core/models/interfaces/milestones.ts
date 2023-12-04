export enum MilestoneStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  FINISHED = 'FINISHED',
}

export enum DeliverableStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DELIVERED = 'DELIVERED',
}

export type CoordinatorType = '';
export type ContributorType = '';

export interface BudgetExpenditure {
  percentage: number; // between 0 and 1, where 1 means 100%
  actuals: number; // denominated in DAI
  cap: number; // denominated in DAI
}

export interface Percentage {
  value: number; // between 0 and 1, where 1 means 100%
}

export interface StoryPoints {
  total: number;
  completed: number;
}

export interface DeliverablesCompleted {
  total: number;
  completed: number;
}

export type Indication = StoryPoints | Percentage | DeliverablesCompleted;

export interface MilestoneProgress {
  status: MilestoneStatus;
  indication?: Indication | null;
}

export interface Coordinator {
  ref: CoordinatorType;
  id: string;
  imgUrl?: string | null;
  name?: string | null;
  code?: string | null;
}

export interface ContributorTeam {
  ref: ContributorType;
  id: string;
  imgUrl?: string | null;
  name?: string | null;
  code?: string | null;
}

export interface KeyResult {
  id: string;
  title: string;
  link?: string | null;
}

export interface Deliverable {
  id: string;
  title: string;
  status: DeliverableStatus;
  ownerId: string;
  description: string;
  project?: string | null;
  keyResults: KeyResult[];
  highlighted: boolean;
}

export interface Milestone {
  id: string;
  phase: string;
  code: string;
  title: string;
  description: string;
  progress: MilestoneProgress;
  targetDate?: string | null;
  imgURL?: string | null;
  estimatedBudgetCap: number; // denominated in DAI
  budgetExpenditure: BudgetExpenditure;
  coordinators: Coordinator[];
  contributorTeams: ContributorTeam[];
  deliverables: Deliverable[];
}
