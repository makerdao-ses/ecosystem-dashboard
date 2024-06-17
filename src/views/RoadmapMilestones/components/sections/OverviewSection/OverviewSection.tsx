import { styled } from '@mui/material';
import React from 'react';
import RoadmapTimeline from '../../RoadmapTimeline/RoadmapTimeline';
import SectionTitle from '../../SectionTitle/SectionTitle';

const OverviewSection: React.FC = () => (
  <Section>
    <SectionTitle
      title="Roadmap Milestones"
      tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
    />
    <TimelineContainer>
      <RoadmapTimeline />
    </TimelineContainer>
  </Section>
);

export default OverviewSection;

const Section = styled('section')(({ theme }) => ({
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
  },
}));

const TimelineContainer = styled('div')(({ theme }) => ({
  marginTop: 18,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },
}));
