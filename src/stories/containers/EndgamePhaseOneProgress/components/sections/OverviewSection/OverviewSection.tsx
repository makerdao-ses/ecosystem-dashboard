import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const OverviewSection: React.FC = () => (
  <Section>
    <SectionTitle
      title="Milestones Roadmap Overview"
      tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
    />
  </Section>
);

export default OverviewSection;

const Section = styled.div({
  marginTop: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
  },
});
