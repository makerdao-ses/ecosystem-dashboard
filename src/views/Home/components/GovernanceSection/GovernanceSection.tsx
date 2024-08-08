import { styled } from '@mui/material';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import { sectionsData } from '../../staticData';
import { SectionTitle } from '../FinancesSectionTitle/FinancesSectionTitle';
import ForumOverview from './ForumOverview/ForumOverview';
import Proposals from './Proposals/Proposals';

interface GovernanceSectionProps {
  governanceProposals: ExtendedExecutiveProposal[];
}

const GovernanceSection: React.FC<GovernanceSectionProps> = ({ governanceProposals }) => (
  <SectionContainer>
    <SectionTitle>{sectionsData.titles[1]}</SectionTitle>

    <Proposals governanceProposals={governanceProposals} />
    <ForumOverview />
  </SectionContainer>
);

export default GovernanceSection;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
