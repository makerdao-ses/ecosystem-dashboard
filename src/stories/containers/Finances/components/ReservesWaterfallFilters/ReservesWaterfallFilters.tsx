import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import ResponsiveButtonClearFilter from '@ses/components/ResponsiveButtonClearFilter/ResponsiveButtonClearFilter';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
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
  title: string;
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
  title,
}) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  // Show name if only one element its active
  const singleActiveItemLabel =
    activeItems.length === 1 ? items.find((item) => item.id === activeItems[0])?.content : null;

  const label = isMobile
    ? activeItems.length === 1
      ? `Categories (${activeItems.length})`
      : 'Categories'
    : items.length === activeItems.length
    ? 'All Categories'
    : activeItems.length === 1 && singleActiveItemLabel
    ? singleActiveItemLabel
    : 'Categories';
  return (
    <ContainerFilterTitle>
      <SectionTitle
        title={title}
        tooltip={
          'Customize this chart to display MakerDAO financial data by selecting one or more components from the dropdown, set to "All Components" by default, and choose your preferred granularity(Quarterly, Monthly, Yearly)'
        }
      />

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
              isTextCut={activeItems.length === 1}
              label={label as string}
              activeItems={activeItems}
              withAll
              items={items}
              onChange={(value: string[]) => {
                handleSelectChangeItem(value);
              }}
              showMetricOneItemSelect
              popupContainerWidth={300}
              listItemWidth={280}
              customAll={{
                content: 'All Categories',
                id: 'all',
                params: { isAll: true },
                count: 0,
              }}
              popupContainerHeight={popupContainerHeight}
              customItemRender={(props: SelectItemProps) => <BudgetItem {...props} />}
            />
          </ContainerFiltersMetric>

          <SingleItemSelect
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
    </ContainerFilterTitle>
  );
};

export default ReservesWaterfallFilters;

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  zIndex: 1,
  marginTop: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
    marginTop: 'revert',
    alignSelf: 'flex-end',
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

const ContainerFiltersMetric = styled.div({
  display: 'flex',
  gridArea: 'filterMetrics',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});

const CustomMultiSelectStyled = styled(CustomMultiSelect)<{ isTextCut: boolean }>(({ isTextCut }) => ({
  '& > div:nth-of-type(2)': {
    borderRadius: 6,
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    ...(isTextCut && {
      '& > div': {
        '& > div:first-of-type': {
          width: 160,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: ' hidden',
        },
      },
    }),
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    ...(isTextCut && {
      '& > div': {
        '& > div:first-of-type': {
          width: 'revert',
        },
      },
    }),
  },
}));

const ContainerFilterTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: 34,
  gap: 16,
  flex: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
