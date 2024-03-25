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
  popupContainerHeight?: number | string;
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
          label={isMobile || activeItems.length !== 1 ? 'Metrics' : activeItems[0]}
          activeItems={activeItems}
          items={metrics}
          showMetricOneItemSelect={!isMobile}
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
        <SingleItemSelect
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
  gap: '12px',
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
  '& > div:nth-of-type(2)': {
    borderRadius: 6,
  },
});
