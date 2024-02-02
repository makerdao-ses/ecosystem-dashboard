import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownTableFinances from '../../BreakdownTableFinances/BreakdownTableFinances';
import FinancesTable from '../../FinacesTable/FinancesTable';
import HeaderTable from '../../HeaderTable/HeaderTable';
import type { MetricValues, PeriodicSelectionFilter, TableFinances } from '../../../utils/types';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

interface Props {
  metrics: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
  periodicSelectionFilter: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  widthPaper?: number;
  year: string;
  handleResetMetrics?: string[];
  maxItems?: number;
  minItems?: number;
  allowSelectAll?: boolean;
  popupContainerHeight?: number;
  breakdownTable: TableFinances[];
  isLoading: boolean;
  headerTable: MetricValues[];
  title: string;
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  metrics,
  periodicSelectionFilter,
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
}) => (
  <MainContainer>
    <BreakdownTableFinances
      activeItems={activeItems}
      handleChange={handleChange}
      handleResetFilter={handleResetFilter}
      handleSelectChange={handleSelectChange}
      metrics={metrics}
      periodicSelectionFilter={periodicSelectionFilter}
      selectedValue={selectedValue}
      defaultMetricsWithAllSelected={handleResetMetrics}
      maxItems={maxItems}
      minItems={minItems}
      allowSelectAll={allowSelectAll}
      popupContainerHeight={popupContainerHeight}
    />
    {isLoading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
          color: 'red',
        }}
      >
        Loading...
      </div>
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
