import { styled } from '@mui/material';
import AdvanceTable from '@ses/components/AdvanceTable/AdvanceTable';
import SectionHeader from '../SectionHeader/SectionHeader';
import { EXPENSES_COMPARISON_TABLE_HEADER, EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN } from './headers';
import type { RowProps } from '@ses/components/AdvanceTable/types';

interface ExpensesComparisonProps {
  rows: RowProps[];
  hasOffChainData: boolean;
}

const ExpensesComparison: React.FC<ExpensesComparisonProps> = ({ rows, hasOffChainData }) => (
  <div>
    <SectionHeader
      title="Reported Expenses Comparison"
      subtitle={'Reported actuals compared to expense and revenue transactions.'}
      tooltip={
        'Understand the differences between reported and net transactions. Easily spot variations \
          and improve financial tracking for comprehensive expense  and revenue analysis.'
      }
    />

    <TableWrapper>
      <StyledTable
        header={hasOffChainData ? EXPENSES_COMPARISON_TABLE_HEADER : EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN}
        body={rows}
      />
    </TableWrapper>
  </div>
);

export default ExpensesComparison;

const TableWrapper = styled('div')({
  marginTop: 24,
});

const StyledTable = styled(AdvanceTable)(({ theme }) => ({
  background: theme.palette.isLight ? '#FFFFFF' : '#1E2C37',
}));
