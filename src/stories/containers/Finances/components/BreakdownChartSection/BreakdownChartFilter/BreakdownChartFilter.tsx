import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BreakdownChartFilterProps {
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedGranularity: AnalyticGranularity;
  onGranularityChange: (value: AnalyticGranularity) => void;
  isDisabled?: boolean;
  handleResetFilter: () => void;
}

const BreakdownChartFilter: React.FC<BreakdownChartFilterProps> = ({
  selectedMetric,
  onMetricChange,
  selectedGranularity,
  onGranularityChange,
  isDisabled = true,
  handleResetFilter,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const colorButton = isLight ? (isDisabled ? '#ECEFF9' : '#231536') : isDisabled ? '#48495F' : '#D4D9E1';
  const metricItems: SelectItem<AnalyticMetric>[] = [
    {
      label: 'Budget',
      value: 'Budget',
    },
    {
      label: 'Forecast',
      value: 'Forecast',
    },
    {
      label: 'Net Protocol Outflow',
      value: 'ProtocolNetOutflow',
      labelWhenSelected: isMobile ? 'Prtcol Outfl' : 'Protocol Outflow',
    },
    {
      label: !isMobile ? 'Net Expenses On-chain' : 'Net Exp. On-Chain',
      value: 'PaymentsOnChain',
      labelWhenSelected: 'Net On-chain',
    },
    {
      label: 'Actuals',
      value: 'Actuals',
    },
  ];

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
          onChange={(metric: string) => onMetricChange(metric as AnalyticMetric)}
          items={metricItems}
          maxHeightSimpleBar="fit-content"
          PopperProps={{
            placement: 'bottom-end',
          }}
        />
        <SingleItemSelect
          useSelectedAsLabel
          selected={selectedGranularity}
          onChange={(value) => onGranularityChange(value as AnalyticGranularity)}
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

      <ResponsiveButton onClick={!isDisabled ? handleResetFilter : undefined} isLight={isLight} isDisabled={isDisabled}>
        <Close width={10} height={10} fill={colorButton} fillDark={colorButton} />
      </ResponsiveButton>
    </FilterContainer>
  );
};

export default BreakdownChartFilter;

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
