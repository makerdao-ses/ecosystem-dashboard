import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import Proposal from '../Proposal/Proposal';

interface ProposalsProps {
  governanceProposals: ExtendedExecutiveProposal[];
}

const Proposals: React.FC<ProposalsProps> = ({ governanceProposals }) => {
  const activeProposals = governanceProposals.filter((proposal) => proposal.active);
  const passedProposals = governanceProposals.filter((proposal) => !proposal.active);
  const slicedPassedProposals = passedProposals.slice(0, Math.min(3, passedProposals.length));

  return (
    <ProposalsContainer>
      {activeProposals.length > 0 && (
        <SectionContainer>
          <SectionHeader>
            <span>Active Executive Proposals</span>
            <ExternalLinkButton href="https://vote.makerdao.com/">Go to Makervote</ExternalLinkButton>
          </SectionHeader>

          <ProposalList>
            {activeProposals.map((proposal, index) => (
              <Proposal key={index} proposal={proposal} />
            ))}
          </ProposalList>
        </SectionContainer>
      )}

      {passedProposals.length > 0 && (
        <SectionContainer>
          <SectionHeader>
            <span>Passed Executive Proposals</span>
            {activeProposals.length === 0 && (
              <ExternalLinkButton href="https://vote.makerdao.com/">Go to Makervote</ExternalLinkButton>
            )}
          </SectionHeader>

          <ProposalList>
            {slicedPassedProposals.map((proposal, index) => (
              <Proposal key={index} proposal={proposal} />
            ))}
          </ProposalList>
        </SectionContainer>
      )}
    </ProposalsContainer>
  );
};

export default Proposals;

const ProposalsContainer = styled(Card)(() => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const SectionContainer = styled('section')(() => ({}));

const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '8px 16px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '4px 24px',
  },
}));

const ProposalList = styled('div')(() => ({
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '0 8px 8px',
}));
