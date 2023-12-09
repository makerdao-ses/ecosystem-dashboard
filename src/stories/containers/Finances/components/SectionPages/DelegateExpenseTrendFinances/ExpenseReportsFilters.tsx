import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface ExpenseReportsFiltersProps {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  selectedStatuses: string[];
  onStatusSelectChange: (value: string[]) => void;
  statusesItems: MultiSelectItem[];
  handleResetFilter: () => void;
}

const ExpenseReportsFilters: React.FC<ExpenseReportsFiltersProps> = ({
  selectedMetric,
  onMetricChange,
  selectedStatuses,
  onStatusSelectChange,
  statusesItems,
  handleResetFilter,
}) => {
  const { isLight } = useThemeContext();
  const isDisabled = selectedMetric === 'Actual' && selectedStatuses.length === 0;
  const colorButton = isLight ? (isDisabled ? '#ECEFF9' : '#231536') : isDisabled ? 'red' : '#48495F';

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
        <MetricSelect
          useSelectedAsLabel
          selected={selectedMetric}
          onChange={onMetricChange}
          items={['Budget', 'Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain']}
          PopperProps={{
            placement: 'bottom-end',
          }}
        />

        <CustomMultiSelectStyled
          positionRight={true}
          label="Status"
          activeItems={selectedStatuses}
          items={statusesItems}
          width={120}
          onChange={onStatusSelectChange}
          withAll={true}
          popupContainerWidth={256}
          listItemWidth={224}
          customAll={{
            content: 'All',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          popupContainerHeight={220}
          //   customItemRender={(props: SelectItemProps) => <ExpenseReportStatus status={BudgetStatus.Draft} />}
        />
      </SelectContainer>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight} isDisabled={isDisabled}>
        <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
      </ResponsiveButton>
    </FilterContainer>
  );
};

export default ExpenseReportsFilters;

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
  zIndex: 1,
});

const Reset = styled.div({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});

const SelectContainer = styled.div({
  display: 'flex',
  gap: 16,
});

const MetricSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});

const ResponsiveButton = styled.div<WithIsLight & { isDisabled: boolean }>(({ isLight, isDisabled }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  height: '34px',
  width: '34px',
  border: isLight ? `1px solid ${isDisabled ? '#ECEFF9' : '#D4D9E1'}` : `1px solid ${isDisabled ? 'red' : '#10191F'}`,
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

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
