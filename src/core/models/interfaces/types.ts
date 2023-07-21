export enum ResourceType {
  AlignedDelegates = 'AlignedDelegates',
  CoreUnit = 'CoreUnit',
  Delegates = 'Delegates',
  EcosystemActor = 'EcosystemActor',
  System = 'System',
}

export enum BudgetStatus {
  Draft = 'Draft',
  Review = 'Review',
  Escalated = 'Escalated',
  Final = 'Final',
}

export enum CuMipStatus {
  RFC = 'RFC',
  FormalSubmission = 'Formal Submission',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Obsolete = 'Obsolete',
  Withdrawn = 'Withdrawn',
}

export enum TeamCategory {
  Technical = 'Technical',
  ActiveEcosystemActor = 'ActiveEcosystemActor',
  ScopeFacilitator = 'ScopeFacilitator',
  Support = 'Support',
  Operational = 'Operational',
  Business = 'Business',
  RWAs = 'RWAs',
  Growth = 'Growth',
  Finance = 'Finance',
  Legal = 'Legal',
  AdvisoryCouncilMember = 'AdvisoryCouncilMember',
}
