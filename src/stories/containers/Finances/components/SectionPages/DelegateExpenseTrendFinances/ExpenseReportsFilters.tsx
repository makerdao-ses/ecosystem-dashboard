import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { getExpenseReportStatusColor } from '@ses/core/utils/colors';
import lightTheme from '@ses/styles/theme/light';
import React, { useMemo } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface ExpenseReportsFiltersProps {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  selectedStatuses: string[];
  onStatusSelectChange: (value: BudgetStatus[]) => void;
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
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isDisabled = selectedMetric === 'Actual' && selectedStatuses.length === 0;
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
        <MetricSelect
          isMobile={isMobile}
          useSelectedAsLabel
          selected={selectedMetric}
          onChange={onMetricChange}
          items={[
            {
              label: 'Actuals',
              value: 'Actuals',
            },
            {
              label: 'Forecast',
              value: 'Forecast',
            },
            {
              label: !isMobile ? 'Net Expenses On-chain' : 'Net Exp. On-Chain',
              value: !isMobile ? 'Net Expenses On-chain' : 'Net Exp. On-Chain',
              labelWhenSelected: 'Net On-chain',
            },
            {
              label: !isMobile ? 'Net Expenses Off-chain' : 'Net Exp. Off-Chain Incl.',
              value: !isMobile ? 'Net Off-chain' : 'Net Exp. Off-Chain Incl.',
              labelWhenSelected: 'Net Off-chain',
            },
          ]}
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
          onChange={(items: string[]) => onStatusSelectChange(items as BudgetStatus[])}
          withAll={true}
          popupContainerWidth={256}
          listItemWidth={224}
          customAll={{
            content: <FilterChip text="All" />,
            id: 'all',
            params: { isAll: true },
            count: statusesItems?.reduce((acc, curr) => acc + curr.count, 0),
          }}
          popupContainerHeight={220}
        />
      </SelectContainer>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight} isDisabled={isDisabled}>
        <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
      </ResponsiveButton>
    </FilterContainer>
  );
};

export default ExpenseReportsFilters;

export const FilterChip: React.FC<{ status?: BudgetStatus; text?: string }> = ({
  status = BudgetStatus.Draft,
  text,
}) => {
  const { isLight } = useThemeContext();
  const variantColor = useMemo(() => getExpenseReportStatusColor(status), [status]);

  return (
    <ExpenseReportStatusStyled isLight={isLight} variantColorSet={variantColor}>
      {text ?? status}
    </ExpenseReportStatusStyled>
  );
};

const ExpenseReportStatusStyled = styled.div<{ isLight: boolean; variantColorSet: { [key: string]: string } }>(
  ({ isLight, variantColorSet }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '11px',
    borderRadius: '12px',
    padding: '4px 8px',
    height: '22px',
    width: 'fit-content',
    lineHeight: '13px',
    border: `1px solid ${isLight ? variantColorSet.color : variantColorSet.darkColor}`,
    background: isLight ? variantColorSet.background : variantColorSet.darkBackground,
    color: isLight ? variantColorSet.color : variantColorSet.darkColor,
  })
);

const FilterContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 16,
  marginLeft: 'auto',
  zIndex: 5,
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
