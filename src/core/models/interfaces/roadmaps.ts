import type { Deliverable } from './deliverables';

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
