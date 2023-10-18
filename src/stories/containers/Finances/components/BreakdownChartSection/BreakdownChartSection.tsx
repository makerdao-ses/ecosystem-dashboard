import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import BreakdownChartFilter from './BreakdownChartFilter/BreakdownChartFilter';
import SectionTitle from './SectionTitle/SectionTitle';

interface BreakdownChartSectionProps {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  selectedGranularity: string;
  onGranularityChange: (value: string) => void;
  year: string;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  year,
  selectedMetric,
  onMetricChange,
  selectedGranularity,
  onGranularityChange,
}) => (
  <Section>
    <HeaderContainer>
      <SectionTitle title="Breakdown Chart" tooltip="No data" />
      <BreakdownChartFilter
        selectedMetric={selectedMetric}
        selectedGranularity={selectedGranularity}
        onMetricChange={onMetricChange}
        onGranularityChange={onGranularityChange}
      />
    </HeaderContainer>

    <BreakdownChart year={year} />
  </Section>
);

export default BreakdownChartSection;

const Section = styled.section({
  marginTop: 40,
});

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
