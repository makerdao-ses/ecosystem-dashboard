import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownTableFinances from '../BreakdownTableFinances/BreakdownTableFinances';
import HeaderTable from '../HeaderTable/HeaderTable';
import type { MetricsWithAmount } from '../../utils/types';
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
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  handleChange,
  handleResetFilter,
  handleSelectChange,
  isOpen,
  metrics,
  periodicSelectionFilter,
  selectedValue,
  onClose,
  onOpen,
  headerTableMetrics,
  metricTotal,

  year,
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
    />
    <TableHeader>
      <HeaderTable title="MakerDAO Budget" metrics={headerTableMetrics} year={year} metricTotal={metricTotal} />
    </TableHeader>
    <TableWrapper />
  </MainContainer>
);

export default BreakdownTable;

const TableHeader = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
  },
});

const TableWrapper = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
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
