import { styled } from '@mui/system';
import React from 'react';
import MilestoneDetailsCard from '../../MilestoneDetailsCard/MilestoneDetailsCard';
import SectionTitle from '../../SectionTitle/SectionTitle';

const DetailsSection: React.FC = () => (
  <Section>
    <SectionTitle title="Milestones Details" />

    <MilestonesDetails>
      <MilestoneDetailsCard />
      <MilestoneDetailsCard />
      <MilestoneDetailsCard />
      <MilestoneDetailsCard />
    </MilestonesDetails>
  </Section>
);

export default DetailsSection;

const Section = styled('section')({});

const MilestonesDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
    marginTop: 32,
  },
}));
