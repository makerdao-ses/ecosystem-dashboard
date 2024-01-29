import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetItem from './BudgetItem';
import type { MultiSelectItem, SelectItemProps } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface FiltersProps {
  selectedGranularity: string;
  handleGranularityChange: (value: AnalyticGranularity) => void;
  isDisabled?: boolean;
  handleResetFilter: () => void;
  handleSelectChangeItem: (value: string[]) => void;
  popupContainerHeight: number;
  activeItems: string[];
  items: MultiSelectItem[];
}

const ReservesWaterFallFilters: React.FC<FiltersProps> = ({
  activeItems,
  selectedGranularity,
  popupContainerHeight,
  handleGranularityChange,
  isDisabled = false,
  handleResetFilter,
  handleSelectChangeItem,
  items,
}) => {
  const { isLight } = useThemeContext();

  const colorButton = isLight ? (isDisabled ? '#ECEFF9' : '#231536') : isDisabled ? '#48495F' : '#D4D9E1';

  return (
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
              count: activeItems.length,
            }}
            popupContainerHeight={popupContainerHeight}
            customItemRender={(props: SelectItemProps) => <BudgetItem {...props} />}
          />
        </ContainerFiltersMetric>

        <GranularitySelect
          useSelectedAsLabel
          selected={selectedGranularity}
          onChange={(value) => handleGranularityChange(value as AnalyticGranularity)}
          items={['Monthly', 'Quarterly', 'Annually']}
          PopperProps={{
            placement: 'bottom-end',
          }}
        />
      </SelectContainer>

      <ResponsiveButton onClick={!isDisabled ? handleResetFilter : undefined} isLight={isLight} isDisabled={isDisabled}>
        <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
      </ResponsiveButton>
    </FilterContainer>
  );
};
//
export default ReservesWaterFallFilters;

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

const ResponsiveButton = styled.div<WithIsLight & { isDisabled: boolean }>(({ isLight, isDisabled }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  height: '34px',
  cursor: 'pointer',
  width: '34px',
  border: isLight
    ? `1px solid ${isDisabled ? '#ECEFF9' : '#D4D9E1'}`
    : `1px solid ${isDisabled ? '#10191F' : '#D4D9E1'}`,
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

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
