import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BreakdownTableFinances from '../BreakdownTableFinances/BreakdownTableFinances';
import HeaderTable from '../HeaderTable/HeaderTable';
import type { SelectChangeEvent } from '@mui/material/Select/Select';
import type { RowProps } from '@ses/components/AdvanceTable/types';
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
  // TODO: remove this mock when we have the real data.
  bodyTable: RowProps[];
  totalCardsNavigation: string[];
  year: string;
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

  year,
}) => (
  <div>
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
    <TableWrapper>
      <HeaderTable title="MakerDAO Budget" metrics={activeItems} period={selectedValue} year={year} />
    </TableWrapper>
  </div>
);

export default BreakdownTable;

const TableWrapper = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
