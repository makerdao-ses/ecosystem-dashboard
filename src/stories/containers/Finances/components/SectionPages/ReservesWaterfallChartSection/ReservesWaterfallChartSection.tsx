import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../../SectionTitle/SectionTitle';
import WaterFallChart from '../../WaterfallChart/WaterfallChart';
import WaterFallSkeleton from '../../WaterfallChart/WaterfallSkeleton';
import ReservesWaterfallFilters from '../../_ReservesWaterfallFilters/_ReservesWaterfallFilters';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type {
  LegendItemsWaterfall,
  LineWaterfall,
  WaterfallChartSeriesData,
} from '@ses/containers/Finances/utils/types';
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
  isDisabled: boolean;
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
  isDisabled,
}) => (
  <Container>
    <ContainerTitleFilter>
      <SectionTitle
        title={title}
        tooltip={
          'Customize this chart to display MakerDAO financial data by selecting one or more components from the dropdown, set to "All Components" by default, and choose your preferred granularity(Quarterly, Monthly, Yearly)'
        }
      />
      <Filters>
        <ReservesWaterfallFilters
          activeItems={activeItems}
          handleSelectChangeItem={handleSelectChangeItem}
          handleGranularityChange={handleGranularityChange}
          handleResetFilter={handleResetFilter}
          selectedGranularity={selectedGranularity}
          items={items}
          popupContainerHeight={popupContainerHeight}
          isDisabled={isDisabled}
        />
      </Filters>
    </ContainerTitleFilter>
    <ContainerChart>
      {isLoading ? (
        <WaterFallSkeleton />
      ) : (
        <WaterFallChart legends={legends} year={year} selectedGranularity={selectedGranularity} series={series} />
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

const Filters = styled.div({
  height: 34,
  zIndex: 3,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 48,
  },
});
