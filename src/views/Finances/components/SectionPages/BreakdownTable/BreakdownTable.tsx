import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import BreakdownTableFinances from '../../BreakdownTableFinances/BreakdownTableFinances';
import FinancesTable from '../../FinacesTable/FinancesTable';
import HeaderTable from '../../HeaderTable/HeaderTable';
import BreakdownTableSkeleton from './BreakdownTableSkeleton/BreakdownTableSkeleton';
import type { MetricValues, PeriodicSelectionFilter, TableFinances } from '../../../utils/types';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodSelectOptions: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  widthPaper?: number;
  year: string;
  handleResetMetrics?: string[];
  maxItems?: number;
  minItems?: number;
  allowSelectAll?: boolean;
  popupContainerHeight?: number | string;
  breakdownTable: TableFinances[];
  isLoading: boolean;
  headerTable: MetricValues[];
  title: string;
  isDisabled?: boolean;
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  metrics,
  periodSelectOptions,
  selectedValue,
  year,
  handleResetMetrics,
  maxItems,
  minItems,
  allowSelectAll,
  popupContainerHeight,
  breakdownTable,
  isLoading,
  headerTable,
  title,
  isDisabled,
}) => (
  <MainContainer>
    <BreakdownTableFinances
      activeItems={activeItems}
      handleChange={handleChange}
      handleResetFilter={handleResetFilter}
      handleSelectChange={handleSelectChange}
      metrics={metrics}
      periodSelectOptions={periodSelectOptions}
      selectedValue={selectedValue}
      defaultMetricsWithAllSelected={handleResetMetrics}
      maxItems={maxItems}
      minItems={minItems}
      allowSelectAll={allowSelectAll}
      popupContainerHeight={popupContainerHeight}
      isDisabled={isDisabled}
    />
    {isLoading ? (
      <SkeletonWrapper>
        <BreakdownTableSkeleton />
      </SkeletonWrapper>
    ) : (
      <>
        <TableHeader>
          <HeaderTable
            title={title}
            year={year}
            period={selectedValue as PeriodicSelectionFilter}
            headerTable={headerTable}
            activeMetrics={activeItems}
          />
        </TableHeader>
        <TableWrapper>
          <FinancesTable
            breakdownTable={breakdownTable}
            metrics={activeItems}
            year={year}
            period={selectedValue as PeriodicSelectionFilter}
          />
        </TableWrapper>
      </>
    )}
  </MainContainer>
);

export default BreakdownTable;

const TableHeader = styled.div({
  marginTop: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const TableWrapper = styled.div({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
});

const MainContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginTop: 40,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
});

const SkeletonWrapper = styled('div')({
  marginTop: 24,
});
