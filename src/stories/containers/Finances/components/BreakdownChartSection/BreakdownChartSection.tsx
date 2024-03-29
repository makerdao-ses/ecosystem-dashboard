import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import BreakdownChartSkeleton from './BreakdownChart/BreakdownChartSkeleton';
import BreakdownChartFilter from './BreakdownChartFilter/BreakdownChartFilter';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

export interface BreakdownChartSectionProps {
  isLoading: boolean;
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedGranularity: AnalyticGranularity;
  onGranularityChange: (value: AnalyticGranularity) => void;
  year: string;
  isDisabled?: boolean;
  handleResetFilter: () => void;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  isLoading,
  year,
  selectedMetric,
  onMetricChange,
  selectedGranularity,
  onGranularityChange,
  isDisabled,
  handleResetFilter,
  series,
  handleToggleSeries,
  refBreakDownChart,
}) => (
  <Section>
    <HeaderContainer>
      <SectionTitle
        title="Breakdown Chart"
        tooltip="Explore comprehensive financial data by adjusting the chart's time granularity and selecting specific metrics for tailored insights."
      />
      <BreakdownChartFilter
        selectedMetric={selectedMetric}
        selectedGranularity={selectedGranularity}
        onMetricChange={onMetricChange}
        onGranularityChange={onGranularityChange}
        isDisabled={isDisabled}
        handleResetFilter={handleResetFilter}
      />
    </HeaderContainer>

    {isLoading ? (
      <Wrapper>
        <BreakdownChartSkeleton />
      </Wrapper>
    ) : (
      <Wrapper>
        <BreakdownChart
          year={year}
          selectedGranularity={selectedGranularity as AnalyticGranularity}
          series={series}
          handleToggleSeries={handleToggleSeries}
          refBreakDownChart={refBreakDownChart}
          selectedMetric={selectedMetric}
        />
      </Wrapper>
    )}
  </Section>
);

export default BreakdownChartSection;

const Section = styled('section')(({ theme }) => ({
  marginTop: 40,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const Wrapper = styled('div')({
  marginTop: 32,
});
