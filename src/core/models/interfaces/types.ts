export enum ResourceType {
  AlignedDelegates = 'AlignedDelegates',
  CoreUnit = 'CoreUnit',
  Delegates = 'Delegates',
  Keepers = 'Keepers',
  EcosystemActor = 'EcosystemActor',
  System = 'System',
}

export enum BudgetStatus {
  Draft = 'Draft',
  Review = 'Review',
  Escalated = 'Escalated',
  Final = 'Final',
}

export enum TeamStatus {
  RFC = 'RFC',
  FormalSubmission = 'Formal Submission',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Obsolete = 'Obsolete',
  Withdrawn = 'Withdrawn',
}

export enum TeamCategory {
  Technical = 'Technical',
  Support = 'Support',
  Operational = 'Operational',
  Business = 'Business',
  RWAs = 'RWAs',
  Growth = 'Growth',
  Finance = 'Finance',
  Legal = 'Legal',
  AdvisoryCouncilMember = 'AdvisoryCouncilMember',
  ActiveEcosystemActor = 'ActiveEcosystemActor',
  ScopeFacilitator = 'ScopeFacilitator',
}

export enum ActorCategory {
  AdvisoryCouncilMember = 'AdvisoryCouncilMember',
  ActiveEcosystemActor = 'ActiveEcosystemActor',
  ScopeFacilitator = 'ScopeFacilitator',
}
