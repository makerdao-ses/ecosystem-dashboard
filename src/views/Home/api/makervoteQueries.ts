import type {
  ExecutiveProposal,
  ExecutiveProposalSupporters,
  ExtendedExecutiveProposal,
} from '@/core/models/interfaces/makervote';

export const getGovernanceProposals = async () => {
  const executiveResponse = await fetch('https://vote.makerdao.com/api/executive');
  const proposals = (await executiveResponse.json()) as ExecutiveProposal[];

  const supportersResponse = await fetch('https://vote.makerdao.com/api/executive/supporters');
  const supporters = (await supportersResponse.json()) as ExecutiveProposalSupporters;

  proposals.forEach((proposal) => {
    // the address can contain upper/lower case letters differently from the proposal address
    // but it still represents the same address
    const key = Object.keys(supporters).find((key) => key.toLowerCase() === proposal.address.toLowerCase());
    (proposal as ExtendedExecutiveProposal).supporters = key ? supporters[key]?.length : 0;
  });

  return proposals as ExtendedExecutiveProposal[];
};
