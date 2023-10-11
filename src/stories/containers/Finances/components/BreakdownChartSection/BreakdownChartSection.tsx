import styled from '@emotion/styled';
import React from 'react';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import SectionTitle from './SectionTitle/SectionTitle';

interface BreakdownChartSectionProps {
  year: string;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({ year }) => (
  <Section>
    <SectionTitle title="Breakdown Chart" tooltip="No data" />
    <BreakdownChart year={year} />
  </Section>
);

export default BreakdownChartSection;

const Section = styled.section({
  marginTop: 40,
});
