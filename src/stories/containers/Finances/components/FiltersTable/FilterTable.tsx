import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import { Close } from '@ses/components/svg/close';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
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
  maxItems?: number;
  minItems?: number;
  defaultMetricsWithAllSelected?: string[];
  allowSelectAll?: boolean;
  popupContainerHeight?: number;
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
  maxItems,
  minItems,
  defaultMetricsWithAllSelected,
  allowSelectAll,
  popupContainerHeight,
}) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
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
        <CustomMultiSelectStyled
          allowSelectAll={allowSelectAll}
          maxItems={maxItems}
          minItems={minItems}
          defaultMetricsWithAllSelected={defaultMetricsWithAllSelected}
          positionRight={!isMobile}
          label="Metrics"
          activeItems={activeItems}
          items={metrics}
          width={120}
          onChange={(value: string[]) => {
            handleSelectChange(value);
          }}
          withAll={allowSelectAll}
          popupContainerWidth={256}
          listItemWidth={224}
          customAll={{
            content: 'All Metrics',
            id: 'all',
            params: { isAll: true },
            count: 0,
          }}
          popupContainerHeight={popupContainerHeight}
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
          widthPaper={224}
          menuAnchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
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
  gridTemplateColumns: 'auto auto auto',
  gridTemplateRows: 'auto',
  placeItems: 'space-between',
  justifyContent: 'end',
  margin: '0 auto',
  gridTemplateAreas: `
  "filterMetrics periodicSelection buttonFilter "
  `,
  [lightTheme.breakpoints.up('tablet_768')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});

const ContainerFiltersMetric = styled.div({
  display: 'flex',
  gridArea: 'filterMetrics',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
});
const PeriodicSelectionFilter = styled.div({
  gridArea: 'periodicSelection',
  justifyContent: 'flex-end',
  [lightTheme.breakpoints.up('tablet_768')]: {
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
}));

const StyledSelectDropdown = styled(SelectDropdown)({
  '& > div': {
    width: 141,
    height: 34,

    [lightTheme.breakpoints.up('tablet_768')]: {
      width: 120,
      height: 48,
    },
  },
});

const CustomMultiSelectStyled = styled(CustomMultiSelect)({
  '& > div:first-of-type': {
    [lightTheme.breakpoints.up('tablet_768')]: {
      height: 48,
    },
  },
});
