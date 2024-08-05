export interface ExecutiveProposal {
  about: string;
  content: string;
  title: string;
  proposalBlurb: string;
  key: string;
  address: string;
  date: string;
  active: boolean;
  proposalLink: string;
  spellData: {
    hasBeenCast: boolean;
    hasBeenScheduled: boolean;
    eta: string;
    expiration: string;
    nextCastTime: string;
    datePassed: string;
    dateExecuted: string;
    mkrSupport: string;
    executiveHash: string;
    officeHours: boolean;
  };
}

export interface Supporters {
  address: string;
  deposits: string;
  percent: string;
}

export type ExecutiveProposalSupporters = Record<string, Supporters[]>;

export interface ExtendedExecutiveProposal extends ExecutiveProposal {
  supporters: number;
}
