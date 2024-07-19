import styled from '@emotion/styled';
import { sortDoughnutSeriesByValue } from '@ses/core/utils/sort';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import ItemLegendDoughnut from './ItemLegendDoughnut';

interface Props {
  isCoreThirdLevel?: boolean;
  changeAlignment: boolean;
  doughnutSeriesData: DoughnutSeries[];
  toggleSeriesVisibility: (seriesName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  onLegendItemHover: (legendName: string) => void;
}

const CardLegend: React.FC<Props> = ({
  changeAlignment,
  isCoreThirdLevel = true,
  doughnutSeriesData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}) => {
  const sortedDoughnutSeries = sortDoughnutSeriesByValue(doughnutSeriesData);
  return (
    <ContainerLegend isCoreThirdLevel={isCoreThirdLevel} changeAlignment={changeAlignment}>
      {sortedDoughnutSeries.map((data, index) => (
        <ItemLegendDoughnut
          key={index}
          changeAlignment={changeAlignment}
          doughnutData={data}
          onLegendItemHover={onLegendItemHover}
          onLegendItemLeave={onLegendItemLeave}
          toggleSeriesVisibility={toggleSeriesVisibility}
          isCoreThirdLevel={isCoreThirdLevel}
        />
      ))}
    </ContainerLegend>
  );
};

export default CardLegend;

const ContainerLegend = styled.div<{ isCoreThirdLevel: boolean; changeAlignment: boolean }>(
  ({ isCoreThirdLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isCoreThirdLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isCoreThirdLevel ? 16 : 14,
    maxWidth: '100%',
    maxHeight: isCoreThirdLevel ? 180 : 210,

    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 16,
      columnGap: 32,
    },
  })
);
