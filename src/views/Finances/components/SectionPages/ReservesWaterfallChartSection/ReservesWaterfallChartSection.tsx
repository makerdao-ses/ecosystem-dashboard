import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { LegendItemsWaterfall, LineWaterfall, WaterfallChartSeriesData } from '@/views/Finances/utils/types';
import ReservesWaterfallFilters from '../../ReservesWaterfallFilters/ReservesWaterfallFilters';
import WaterfallChart from '../../WaterfallChart/WaterfallChart';
import WaterfallSkeleton from '../../WaterfallChart/WaterfallSkeleton';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  legends: LegendItemsWaterfall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: (WaterfallChartSeriesData | LineWaterfall)[];
  activeItems: string[];
  handleSelectChangeItem: (value: string[]) => void;
  popupContainerHeight: number;
  items: MultiSelectItem[];
  handleGranularityChange: (value: AnalyticGranularity) => void;
  handleResetFilter: () => void;
  isLoading: boolean;
  areDefaultFiltersSelected: boolean;
}

const ReservesWaterfallChartSection: React.FC<Props> = ({
  title,
  legends,
  selectedGranularity,
  series,
  year,
  activeItems,
  handleSelectChangeItem,
  items,
  popupContainerHeight,
  handleGranularityChange,
  handleResetFilter,
  isLoading,
  areDefaultFiltersSelected,
}) => (
  <Container>
    <ContainerTitleFilter>
      <ReservesWaterfallFilters
        title={title}
        activeItems={activeItems}
        handleSelectChangeItem={handleSelectChangeItem}
        handleGranularityChange={handleGranularityChange}
        handleResetFilter={handleResetFilter}
        selectedGranularity={selectedGranularity}
        items={items}
        popupContainerHeight={popupContainerHeight}
        areDefaultFiltersSelected={areDefaultFiltersSelected}
      />
    </ContainerTitleFilter>
    <ContainerChart>
      {isLoading ? (
        <WaterfallSkeleton />
      ) : (
        <WaterfallChart legends={legends} year={year} selectedGranularity={selectedGranularity} series={series} />
      )}
    </ContainerChart>
  </Container>
);

export default ReservesWaterfallChartSection;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const ContainerTitleFilter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 'revert',
  },
});

const ContainerChart = styled.div({});
