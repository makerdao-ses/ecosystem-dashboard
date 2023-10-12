import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import ChartFilter from './ChartFilter/ChartFilter';
import SectionTitle from './SectionTitle/SectionTitle';

interface BreakdownChartSectionProps {
  year: string;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({ year }) => (
  <Section>
    <HeadContainer>
      <SectionTitle title="Breakdown Chart" tooltip="No data" />
      <ChartFilter />
    </HeadContainer>
    <BreakdownChart year={year} />
  </Section>
);

export default BreakdownChartSection;

const Section = styled.section({
  marginTop: 40,
});

const HeadContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 26,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
