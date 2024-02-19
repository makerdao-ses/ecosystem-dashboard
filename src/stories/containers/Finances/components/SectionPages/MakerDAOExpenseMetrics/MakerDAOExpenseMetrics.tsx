import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MakerDAOChartMetrics from './MakerDAOChartMetrics/MakerDAOChartMetrics';
import MakerDAOExpenseMetricsSkeleton from './MakerDAOExpenseMetricsSkeleton';
import TitleFilterComponent from './TitleFilterComponent';
import type { LineChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  handleGranularityChange: (value: AnalyticGranularity) => void;
  selectedGranularity: AnalyticGranularity;
  series: LineChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  year: string;
  isLoading: boolean;
}

const MakerDAOExpenseMetricsFinances: React.FC<Props> = ({
  title,
  handleGranularityChange,
  selectedGranularity,
  series,
  handleToggleSeries,
  year,
  isLoading,
}) => (
  <Container>
    <TitleFilterComponent title={title} handleChange={handleGranularityChange} selectedValue={selectedGranularity} />
    <ContainerChart>
      {isLoading ? (
        <MakerDAOExpenseMetricsSkeleton />
      ) : (
        <MakerDAOChartMetrics
          year={year}
          selectedGranularity={selectedGranularity}
          series={series}
          handleToggleSeries={handleToggleSeries}
        />
      )}
    </ContainerChart>
  </Container>
);

export default MakerDAOExpenseMetricsFinances;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

const ContainerChart = styled.div({});
