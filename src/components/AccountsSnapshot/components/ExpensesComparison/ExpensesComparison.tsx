import { styled, useMediaQuery } from '@mui/material';
import AdvanceTable from '@/components/AdvanceTable/AdvanceTable';
import type { RowProps } from '@/components/AdvanceTable/types';
import SectionHeader from '../SectionHeader/SectionHeader';
import { expensesComparisonTableHeader, expensesComparisonTableHeaderWithoutOffChain } from './headers';
import type { Theme } from '@mui/material';

interface ExpensesComparisonProps {
  rows: RowProps[];
  hasOffChainData: boolean;
}

const ExpensesComparison: React.FC<ExpensesComparisonProps> = ({ rows, hasOffChainData }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  return (
    <div>
      <SectionHeader
        title="Reported Expenses Comparison"
        subtitle={'Reported actuals compared to expense and revenue transactions.'}
        tooltip={
          'Understand the differences between reported and net transactions. Easily spot variations \
            and improve financial tracking for comprehensive expense  and revenue analysis.'
        }
        level="h2"
      />

      <TableWrapper>
        <AdvanceTable
          header={
            hasOffChainData
              ? expensesComparisonTableHeader({ isTablet })
              : expensesComparisonTableHeaderWithoutOffChain()
          }
          body={rows}
        />
      </TableWrapper>
    </div>
  );
};

export default ExpensesComparison;

const TableWrapper = styled('div')(({ theme }) => ({
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
  },
}));
