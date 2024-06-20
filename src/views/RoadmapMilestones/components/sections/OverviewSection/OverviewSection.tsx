import { styled } from '@mui/material';
import React from 'react';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import RoadmapTimeline from '../../RoadmapTimeline/RoadmapTimeline';
import SectionTitle from '../../SectionTitle/SectionTitle';

interface OverviewSectionProps {
  title: string;
  milestones: Milestone[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, milestones }) => (
  <Section>
    <SectionTitle
      title={title}
      tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
    />
    <TimelineContainer>
      <RoadmapTimeline milestones={milestones} />
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
