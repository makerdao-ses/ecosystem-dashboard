import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BreakdownChartFilterProps {
  selectedMetric: string;
  onMetricChange: (value: string) => void;
  selectedGranularity: string;
  onGranularityChange: (value: string) => void;
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
          items={[
            'Budget',
            'Actuals',
            'Forecast',
            !isMobile ? 'Net Expenses On-chain' : 'Net On-chain',
            !isMobile ? 'Net Expenses Off-chain' : 'Net Off-chain',
          ]}
          PopperProps={{
            placement: 'bottom-end',
          }}
        />
        <GranularitySelect
          useSelectedAsLabel
          selected={selectedGranularity}
          onChange={onGranularityChange}
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

const MetricSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
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
