import styled from '@emotion/styled';
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
}

const BreakdownChartFilter: React.FC<BreakdownChartFilterProps> = ({
  selectedMetric,
  onMetricChange,
  selectedGranularity,
  onGranularityChange,
}) => {
  const { isLight } = useThemeContext();

  const isEnable = isLight ? '#231536' : '#48495F';
  const handleResetFilter = () => null;

  return (
    <FilterContainer>
      <Reset>
        <ResetButton
          onClick={handleResetFilter}
          disabled={true}
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
        <GranularitySelect
          useSelectedAsLabel
          selected={selectedGranularity}
          onChange={onGranularityChange}
          items={['Monthly', 'Quarterly', 'Semi-annual', 'Annually']}
          PopperProps={{
            placement: 'bottom-end',
          }}
        />
      </SelectContainer>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight}>
        <Close width={10} height={10} fill={isEnable} fillDark={isEnable} />
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

const MetricSelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});

const GranularitySelect = styled(SingleItemSelect)({
  padding: '7px 15px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});

const ResponsiveButton = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  height: '34px',
  width: '34px',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #10191F',
  borderRadius: '22px',
  alignItems: 'center',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
