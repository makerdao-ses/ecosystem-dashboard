export interface ContributorsInformation {
  title: string;
  href: string;
  contributors: number;
  description: string;
}

export interface MilestoneInformation {
  title: string;
}

export interface RoadmapInformation {
  id: string;
  title: string;
  description: string;
  milestones: MilestoneInformation[];
}
