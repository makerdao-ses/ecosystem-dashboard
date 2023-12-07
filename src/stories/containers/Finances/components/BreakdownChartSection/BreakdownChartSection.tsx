import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import BreakdownChartFilter from './BreakdownChartFilter/BreakdownChartFilter';
import SectionTitle from './SectionTitle/SectionTitle';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

export interface BreakdownChartSectionProps {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  selectedGranularity: string;
  onGranularityChange: (value: string) => void;
  year: string;
  isDisabled?: boolean;
  handleResetFilter: () => void;
  budgets: Budget[];
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined;
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined;
  series: BreakdownChartSeriesData[];
  refBreakDownChart: React.RefObject<EChartsOption | null>;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  year,
  selectedMetric,
  onMetricChange,
  selectedGranularity,
  onGranularityChange,
  isDisabled,
  handleResetFilter,
  budgets,
  budgetsAnalyticsMonthly,
  budgetsAnalyticsQuarterly,
  series,
  refBreakDownChart,
}) => (
  <Section>
    <HeaderContainer>
      <SectionTitle title="Breakdown Chart" tooltip="No data" />
      <BreakdownChartFilter
        selectedMetric={selectedMetric}
        selectedGranularity={selectedGranularity}
        onMetricChange={onMetricChange}
        onGranularityChange={onGranularityChange}
        isDisabled={isDisabled}
        handleResetFilter={handleResetFilter}
      />
    </HeaderContainer>

    <BreakdownChart
      year={year}
      budgets={budgets}
      budgetsAnalyticsMonthly={budgetsAnalyticsMonthly}
      budgetsAnalyticsQuarterly={budgetsAnalyticsQuarterly}
      selectedGranularity={selectedGranularity as AnalyticGranularity}
      series={series}
      refBreakDownChart={refBreakDownChart}
    />
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
