import styled from '@emotion/styled';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import SelectDropdown from '../SelectDropdown';
import MetricItem from './MetricItem';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { SelectItemProps, MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodicSelectionFilter: string[];
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  selectedValue: string;
  isOpen: boolean;
  className?: string;
}

const FilterTable: React.FC<Props> = ({
  periodicSelectionFilter,
  activeItems,
  handleSelectChange,
  handleResetFilter,
  metrics,
  handleChange,
  selectedValue,
  isOpen,
  onClose,
  onOpen,
}) => {
  const { isLight } = useThemeContext();
  const isEnable = isLight
    ? activeItems.length > 0
      ? '#231536'
      : '#d1dee6'
    : activeItems.length > 0
    ? '#D2D4EF'
    : '#48495F';

  return (
    <FiltersContainer>
      <Reset>
        <ResetButton
          onClick={handleResetFilter}
          disabled={activeItems.length <= 0}
          hasIcon={false}
          label="Reset filters"
        />
      </Reset>

      <ContainerFiltersMetric>
        <CustomMultiSelect
          positionRight={true}
          label="Metrics"
          activeItems={activeItems}
          items={metrics}
          width={120}
          onChange={(value: string[]) => {
            handleSelectChange(value);
          }}
          withAll
          popupContainerWidth={256}
          listItemWidth={224}
          customAll={{
            content: 'All Metrics',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          customItemRender={(props: SelectItemProps) => <MetricItem {...props} />}
        />
      </ContainerFiltersMetric>
      <PeriodicSelectionFilter>
        <StyledSelectDropdown
          handleChange={handleChange}
          isOpen={isOpen}
          items={periodicSelectionFilter}
          selectedValue={selectedValue}
          onClose={onClose}
          onOpen={onOpen}
          widthPaper={256}
          height={48}
          width={120}
        />
      </PeriodicSelectionFilter>

      <ResponsiveButton onClick={handleResetFilter} isLight={isLight}>
        <Close width={10} height={10} fill={isEnable} fillDark={isEnable} />
      </ResponsiveButton>
    </FiltersContainer>
  );
};

export default FilterTable;

const FiltersContainer = styled.div({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'auto auto',
  gridTemplateRows: 'auto',
  placeItems: 'space-between',
  justifyContent: 'end',
  width: 343,
  margin: '0 auto',
  gridTemplateAreas: `
  "filterMetrics buttonFilter"
  `,
  '@media (min-width: 834px)': {
    width: 690,
    gridTemplateRows: 'auto',
    margin: 'none',
    gap: 18,
    justifyContent: 'flex-end',
    gridTemplateAreas: '"reset filterMetrics periodicSelection"',
  },
});

const Reset = styled.div({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const ContainerFiltersMetric = styled.div({
  display: 'flex',
  gridArea: 'filterMetrics',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});
const PeriodicSelectionFilter = styled.div({
  gridArea: 'periodicSelection',
  display: 'none',
  justifyContent: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
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
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const StyledSelectDropdown = styled(SelectDropdown)({
  width: 120,
  height: 40,
});
