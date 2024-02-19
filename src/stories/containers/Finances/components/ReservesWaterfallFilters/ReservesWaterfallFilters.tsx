import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import ResponsiveButtonClearFilter from '@ses/components/ResponsiveButtonClearFilter/ResponsiveButtonClearFilter';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetItem from './BudgetItem';
import type { MultiSelectItem, SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface FiltersProps {
  selectedGranularity: AnalyticGranularity;
  handleGranularityChange: (value: AnalyticGranularity) => void;
  isDisabled?: boolean;
  handleResetFilter: () => void;
  handleSelectChangeItem: (value: string[]) => void;
  popupContainerHeight: number;
  activeItems: string[];
  items: MultiSelectItem[];
}

const ReservesWaterfallFilters: React.FC<FiltersProps> = ({
  activeItems,
  selectedGranularity,
  popupContainerHeight,
  handleGranularityChange,
  isDisabled = true,
  handleResetFilter,
  handleSelectChangeItem,
  items,
}) => (
  <FilterContainer>
    <Reset>
      <ResetButton
        onClick={handleResetFilter}
        disabled={isDisabled}
        hasIcon={false}
        label="Reset filters"
        legacyBreakpoints={false}
      />
    </Reset>

    <SelectContainer>
      <ContainerFiltersMetric>
        <CustomMultiSelectStyled
          label="All MakerDAO"
          activeItems={activeItems}
          withAll
          items={items}
          onChange={(value: string[]) => {
            handleSelectChangeItem(value);
          }}
          popupContainerWidth={300}
          listItemWidth={280}
          customAll={{
            content: 'All MakerDAO',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          popupContainerHeight={popupContainerHeight}
          customItemRender={(props: SelectItemProps) => <BudgetItem {...props} />}
        />
      </ContainerFiltersMetric>

      <GranularitySelect
        useSelectedAsLabel
        selected={selectedGranularity}
        onChange={(value) => handleGranularityChange(value as AnalyticGranularity)}
        items={[
          {
            label: 'Monthly',
            value: 'monthly',
          },
          {
            label: 'Quarterly',
            value: 'quarterly',
          },
          {
            label: 'Annually',
            value: 'annual',
          },
        ]}
        PopperProps={{
          placement: 'bottom-end',
        }}
      />
    </SelectContainer>
    <ResponsiveButtonClearFilter handleResetFilter={handleResetFilter} isDisabled={isDisabled} />
  </FilterContainer>
);
//
export default ReservesWaterfallFilters;

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  zIndex: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
});

const Reset = styled.div({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const SelectContainer = styled.div({
  display: 'flex',
  gap: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
    marginTop: -22,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
});

const GranularitySelect = styled(SingleItemSelect)({
  padding: '7px 12px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});

const ContainerFiltersMetric = styled.div({
  display: 'flex',
  gridArea: 'filterMetrics',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});

const CustomMultiSelectStyled = styled(CustomMultiSelect)({
  '& > div:first-of-type': {
    [lightTheme.breakpoints.up('tablet_768')]: {
      height: 48,
    },
  },
  '& > div:nth-of-type(2)': {
    borderRadius: 6,
  },
});
