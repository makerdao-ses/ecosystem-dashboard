import styled from '@emotion/styled';
import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';

const DetailsSection: React.FC = () => (
  <Section>
    <SectionTitle title="Milestones Roadmap Details" />
  </Section>
);

export default DetailsSection;

const Section = styled.div({});
