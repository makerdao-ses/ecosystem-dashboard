import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
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
        tooltip="Explore MakerDAO's financial distribution across the 'MakerDAO Legacy', 'Atlas Immutable', and 'Scope Framework' budgets from 2021-2024. This tool helps track allocation efficiency, identify funding fluctuations, and pinpoint transitions between legacy and endgame budgets."
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const Wrapper = styled('div')({
  marginTop: 32,
});
