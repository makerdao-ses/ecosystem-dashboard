import type { Deliverable } from './deliverables';

export enum BudgetType {
  CONTINGENCY = 'CONTINGENCY',
  OPEX = 'OPEX',
  CAPEX = 'CAPEX',
  OVERHEAD = 'OVERHEAD',
}

export enum ProjectStatus {
  TODO = 'TODO',
  INPROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export enum OwnerType {
  CoreUnit = 'CoreUnit',
  Delegates = 'Delegates',
  SpecialPurposeFund = 'SpecialPurposeFund',
  Project = 'Project',
  EcosystemActor = 'EcosystemActor',
  AlignedDelegates = 'AlignedDelegates',
  Keepers = 'Keepers',
}

export interface Owner {
  ref: OwnerType;
  id: string;
  imgUrl?: string;
  name?: string;
  code?: string;
}

export interface StoryPoints {
  __typename: 'StoryPoints';
  total: number;
  completed: number;
}

export interface Percentage {
  __typename: 'Percentage';
  value: number;
}

export type Progress = StoryPoints | Percentage;

export interface Project {
  id: string;
  owner: Owner;
  code: string;
  title: string;
  abstract?: string;
  status: ProjectStatus;
  progress?: Percentage;
  imgUrl?: string;
  budgetType: BudgetType;
  deliverables: Deliverable[];
}

export interface ProjectsCollectionState {
  projects: [Project];
}
