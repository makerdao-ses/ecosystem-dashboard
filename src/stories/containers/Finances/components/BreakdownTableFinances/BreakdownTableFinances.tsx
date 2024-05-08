import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import FilterTable from '../FiltersTable/FilterTable';
import SectionTitle from '../SectionTitle/SectionTitle';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodSelectOptions: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  maxItems?: number;
  minItems?: number;
  defaultMetricsWithAllSelected?: string[];
  allowSelectAll?: boolean;
  popupContainerHeight?: number | string;
  isDisabled?: boolean;
}

const BreakdownTableFinances = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  periodSelectOptions,
  metrics,
  selectedValue,
  defaultMetricsWithAllSelected,
  maxItems,
  minItems,
  allowSelectAll,
  popupContainerHeight,
  isDisabled,
}: Props) => (
  <Container>
    <SectionTitle
      title={'Breakdown Table'}
      tooltip="The breakdown table enhances the functionality of the breakdown chart by providing a side-by-side multi-metric comparison. It delivers a detailed view with subtotals for each budget category and their subdivisions, along with a cumulative total for selected metrics."
      hash="breakdown-table"
    />

    <FilterContainer>
      <FilterTable
        maxItems={maxItems}
        minItems={minItems}
        defaultMetricsWithAllSelected={defaultMetricsWithAllSelected}
        activeItems={activeItems}
        metrics={metrics}
        handleSelectChange={handleSelectChange}
        handleResetFilter={handleResetFilter}
        handleChange={handleChange}
        selectedValue={selectedValue}
        periodSelectOptions={periodSelectOptions}
        allowSelectAll={allowSelectAll}
        popupContainerHeight={popupContainerHeight}
        isDisabled={isDisabled}
      />
    </FilterContainer>
  </Container>
);
export default BreakdownTableFinances;
const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  gap: 26,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const FilterContainer = styled.div({
  height: 34,

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 48,
    marginLeft: 'auto',
  },
});
