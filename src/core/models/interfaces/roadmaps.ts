import type { Deliverable } from './deliverables';
import type { Maybe } from './generics';

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

export interface DeliverableSet {
  deliverables: Deliverable[];
  status: Maybe<DeliverableSetStatus>;
  progress: Maybe<Progress>;
  totalDeliverables: Maybe<number>;
  deliverablesCompleted: Maybe<number>;
}

export interface Milestone {
  id: string;
  sequenceCode: string;
  code: string;
  title: string;
  abstract: string;
  description: string;
  targetDate: string;

  scope: DeliverableSet;

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

export interface ScopeOfWorkState {
  roadmaps: Roadmap[];
}

export const isPercentage = (progress: Progress): progress is Percentage =>
  (progress as Percentage).value !== undefined;

export const isStoryPoints = (progress: Progress): progress is StoryPoints =>
  (progress as StoryPoints).total !== undefined;
