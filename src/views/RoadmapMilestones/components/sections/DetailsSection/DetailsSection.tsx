import { styled } from '@mui/system';
import React from 'react';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import MilestoneDetailsCard from '../../MilestoneDetailsCard/MilestoneDetailsCard';
import SectionTitle from '../../SectionTitle/SectionTitle';

interface DetailsSectionProps {
  title: string;
  minimal?: boolean;
  milestones: Milestone[];
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ title, minimal, milestones }) => (
  <Section>
    <SectionTitle title={title} />

    <MilestonesDetails>
      {milestones.map((milestone) => (
        <MilestoneDetailsCard key={milestone.id} minimal={minimal} milestone={milestone} />
      ))}
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
