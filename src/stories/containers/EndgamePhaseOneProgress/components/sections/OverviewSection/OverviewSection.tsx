import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import RoadmapTimeline from '../../RoadmapTimeline/RoadmapTimeline';
import SectionTitle from '../../SectionTitle/SectionTitle';

const OverviewSection: React.FC = () => (
  <Section>
    <SectionTitle
      title="Milestones Roadmap Overview"
      tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
    />
    <TimelineContainer>
      <RoadmapTimeline />
    </TimelineContainer>
  </Section>
);

export default OverviewSection;

const Section = styled.section({
  marginTop: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
  },
});

const TimelineContainer = styled.div({
  marginTop: 18,
});
