import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import ResponsiveButtonClearFilter from '@ses/components/ResponsiveButtonClearFilter/ResponsiveButtonClearFilter';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MetricItem from './MetricItem';
import type { SelectItemProps, MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodSelectOptions: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  className?: string;
  maxItems?: number;
  minItems?: number;
  defaultMetricsWithAllSelected?: string[];
  allowSelectAll?: boolean;
  popupContainerHeight?: number;
  isDisabled?: boolean;
}

const FilterTable: React.FC<Props> = ({
  periodSelectOptions,
  activeItems,
  handleSelectChange,
  handleResetFilter,
  metrics,
  handleChange,
  selectedValue,
  maxItems,
  minItems,
  defaultMetricsWithAllSelected,
  allowSelectAll,
  popupContainerHeight,
  isDisabled = true,
}) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <FiltersContainer>
      <Reset>
        <ResetButton onClick={handleResetFilter} disabled={isDisabled} hasIcon={false} label="Reset filters" />
      </Reset>

      <ContainerFiltersMetric>
        <CustomMultiSelectStyled
          allowSelectAll={allowSelectAll}
          maxItems={maxItems}
          minItems={minItems}
          selectNumberItemPerResolution
          defaultMetricsWithAllSelected={defaultMetricsWithAllSelected}
          positionRight={!isMobile}
          label={activeItems.length === 1 ? activeItems[0] : 'Metrics'}
          activeItems={activeItems}
          items={metrics}
          showMetricOneItemSelect
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
        <PeriodSelect
          items={periodSelectOptions}
          useSelectedAsLabel
          onChange={handleChange}
          selected={selectedValue}
          PopperProps={{
            style: {
              zIndex: 2,
            },
            placement: 'bottom-end',
          }}
        />
      </PeriodicSelectionFilter>
      <ResponsiveButtonClearFilter handleResetFilter={handleResetFilter} isDisabled={isDisabled} />
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
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    gridArea: 'reset',
    justifyContent: 'flex-end',
    display: 'flex',
    alignItems: 'center',
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

const PeriodSelect = styled(SingleItemSelect)({
  padding: '7px 12px 7px 16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '14px 15px 14px 16px',
  },
});
