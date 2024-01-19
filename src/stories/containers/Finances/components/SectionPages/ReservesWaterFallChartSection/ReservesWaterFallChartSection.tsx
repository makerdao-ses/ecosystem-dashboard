import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import TitleToolTipArrowLink from '../../TitleToolTipArrowLink/TitleToolTipArrowLink';
import WaterFallChart from '../../WaterFallChart/WaterFallChart';
import type { LegendItemsWaterFall, WaterFallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  legends: LegendItemsWaterFall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: WaterFallChartSeriesData[];
}
const ReservesWaterFallChartSection: React.FC<Props> = ({ title, legends, selectedGranularity, series, year }) => (
  <Container>
    <ContainerTitleFilter>
      <TitleToolTipArrowLink title={title} />
      <Filters />
    </ContainerTitleFilter>
    <ContainerChart>
      <WaterFallChart legends={legends} year={year} selectedGranularity={selectedGranularity} series={series} />
    </ContainerChart>
  </Container>
);

export default ReservesWaterFallChartSection;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const ContainerTitleFilter = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 'revert',
  },
});

const ContainerChart = styled('div')({});

const Filters = styled('div')(({ theme }) => ({
  height: 34,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 48,
  },
}));
