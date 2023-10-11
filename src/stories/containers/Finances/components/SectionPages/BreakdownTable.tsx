import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { mockDataTableQuarterly } from '../../utils/mockData';
import BreakdownTableFinances from '../BreakdownTableFinances/BreakdownTableFinances';
import FinancesTable from '../FinacesTable/FinancesTable';
import HeaderTable from '../HeaderTable/HeaderTable';
import type { MetricsWithAmount, PeriodicSelectionFilter } from '../../utils/types';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

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
  widthPaper?: number;
  year: string;
  headerTableMetrics: MetricsWithAmount[];
  metricTotal: MetricsWithAmount[];
  handleResetMetrics?: string[];
  maxItems?: number;
  minItems?: number;
  allowSelectAll?: boolean;
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  isOpen,
  metrics,
  periodicSelectionFilter,
  onClose,
  onOpen,
  headerTableMetrics,
  metricTotal,
  selectedValue,
  year,
  handleResetMetrics,
  maxItems,
  minItems,
  allowSelectAll,
}) => (
  <MainContainer>
    <BreakdownTableFinances
      activeItems={activeItems}
      handleChange={handleChange}
      handleResetFilter={handleResetFilter}
      handleSelectChange={handleSelectChange}
      isOpen={isOpen}
      metrics={metrics}
      periodicSelectionFilter={periodicSelectionFilter}
      selectedValue={selectedValue}
      onClose={onClose}
      onOpen={onOpen}
      defaultMetricsWithAllSelected={handleResetMetrics}
      maxItems={maxItems}
      minItems={minItems}
      allowSelectAll={allowSelectAll}
    />
    <TableHeader>
      <HeaderTable
        title="MakerDAO Budget"
        metrics={headerTableMetrics}
        year={year}
        metricTotal={metricTotal}
        period={selectedValue as PeriodicSelectionFilter}
      />
    </TableHeader>
    <TableWrapper>
      <FinancesTable
        breakdownTable={mockDataTableQuarterly}
        metrics={activeItems}
        year={year}
        period={selectedValue as PeriodicSelectionFilter}
      />
    </TableWrapper>
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
