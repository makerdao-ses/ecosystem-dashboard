export enum BudgetType {
  CONTINGENCY = 'CONTINGENCY',
  OPEX = 'OPEX',
  CAPEX = 'CAPEX',
  OVERHEAD = 'OVERHEAD',
}

export enum ProjectStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  FINISHED = 'FINISHED',
}

export enum DeliverableStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DELIVERED = 'DELIVERED',
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

export interface KeyResult {
  id: string;
  title: string;
  link: string;
}

export interface Deliverable {
  id: string;
  title: string;
  status: DeliverableStatus;
  owner: Owner;
  keyResults: KeyResult[];
}

export interface InProgress {
  description: string;
}

export interface StoryPoints {
  total: number;
  completed: number;
}

export interface Percentage {
  value: number;
}

export type Indication = InProgress | StoryPoints | Percentage;

export interface Progress {
  status: DeliverableStatus;
  indication: Indication;
}

export interface Project {
  id: string;
  owner: Owner;
  code: string;
  title: string;
  abstract?: string;
  status: ProjectStatus;
  progress?: Progress;
  imgUrl?: string;
  budgetType: BudgetType;
  deliverables: Deliverable[];
}

export interface ProjectsCollectionState {
  projects: [Project];
}
