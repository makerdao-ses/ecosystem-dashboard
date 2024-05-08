import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import ResponsiveButtonClearFilter from '@ses/components/ResponsiveButtonClearFilter/ResponsiveButtonClearFilter';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { getExpenseReportStatusColor } from '@ses/core/utils/colors';
import lightTheme from '@ses/styles/theme/themes';
import React, { useMemo } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';

export interface ExpenseReportsFiltersProps {
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedStatuses: BudgetStatus[];
  onStatusSelectChange: (value: BudgetStatus[]) => void;
  statusesItems: MultiSelectItem[];
  handleResetFilter: () => void;
  isDisabled?: boolean;
}

const ExpenseReportsFilters: React.FC<ExpenseReportsFiltersProps> = ({
  selectedMetric,
  onMetricChange,
  selectedStatuses,
  onStatusSelectChange,
  statusesItems,
  handleResetFilter,
  isDisabled = true,
}) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const metricItems: SelectItem<AnalyticMetric>[] = useMemo(
    () => [
      {
        label: 'Forecast',
        value: 'Forecast',
      },
      {
        label: 'Net Protocol Outflow',
        value: 'ProtocolNetOutflow',
        labelWhenSelected: 'Prtcol Outfl',
      },
      {
        label: 'Net Expenses On-Chain',
        value: 'PaymentsOnChain',
        labelWhenSelected: 'Net On-Chain',
      },
      {
        label: 'Actuals',
        value: 'Actuals',
      },
    ],
    []
  );

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
        <SingleItemSelect
          isMobile={isMobile}
          useSelectedAsLabel
          selected={selectedMetric}
          onChange={(value: string) => onMetricChange(value as AnalyticMetric)}
          items={metricItems}
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
      <ResponsiveButtonClearFilter handleResetFilter={handleResetFilter} isDisabled={isDisabled} />
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

const CustomMultiSelectStyled = styled(CustomMultiSelect)({
  '& > div:nth-of-type(2)': {
    borderRadius: 6,
  },
});
