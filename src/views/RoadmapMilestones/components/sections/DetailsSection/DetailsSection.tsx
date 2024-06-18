import { styled } from '@mui/system';
import React from 'react';
import MilestoneDetailsCard from '../../MilestoneDetailsCard/MilestoneDetailsCard';
import SectionTitle from '../../SectionTitle/SectionTitle';

interface DetailsSectionProps {
  title: string;
  minimal?: boolean;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ title, minimal }) => (
  <Section>
    <SectionTitle title={title} />

    <MilestonesDetails>
      <MilestoneDetailsCard minimal={minimal} />
      <MilestoneDetailsCard minimal={minimal} />
      <MilestoneDetailsCard minimal={minimal} />
      <MilestoneDetailsCard minimal={minimal} />
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
