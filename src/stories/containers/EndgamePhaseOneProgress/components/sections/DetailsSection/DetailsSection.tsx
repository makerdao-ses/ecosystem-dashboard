import styled from '@emotion/styled';
import React from 'react';
import MilestoneDetailsCard from '../../MilestoneDetailsCard/MilestoneDetailsCard';
import SectionTitle from '../../SectionTitle/SectionTitle';

const DetailsSection: React.FC = () => (
  <Section>
    <SectionTitle title="Milestones Roadmap Details" />

    <MilestoneDetailsCard />
    <MilestoneDetailsCard />
    <MilestoneDetailsCard />
    <MilestoneDetailsCard />
  </Section>
);

export default DetailsSection;

const Section = styled.div({});
