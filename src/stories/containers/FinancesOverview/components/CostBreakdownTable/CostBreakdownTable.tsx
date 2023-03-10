import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import CostBreakdownFilter from '../CostBreakdownFilter/CostBreakdownFilter';
import ByBudgetTableHeader from './ByBudgetTableHeader';
import ByBudgetTableRow from './ByBudgetTableRow';
import ByExpenseCategoryTableHeader from './ByExpenseCategoryTableHeader';
import ByExpenseCategoryTableRow from './ByExpenseCategoryTableRow';
import ExpenseCategoryGroup from './ExpenseCategoryGroup';
import TableFooter from './TableFooter';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CostBreakdownTableProps {
  selectedFilter: CostBreakdownFilterValue;
  setSelectedFilter: (value: CostBreakdownFilterValue) => void;
}

const CostBreakdownTable: React.FC<CostBreakdownTableProps> = ({ selectedFilter, setSelectedFilter }) => {
  const { isLight } = useThemeContext();

  return (
    <BreakdownTableContainer>
      <CostBreakdownFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <Table isLight={isLight}>
        {selectedFilter === 'By budget' ? <ByBudgetTableHeader /> : <ByExpenseCategoryTableHeader />}
        <TableBody>
          {selectedFilter === 'By budget' ? (
            <>
              <ByBudgetTableRow shortCode="PE" name="Protocol Engineering" total={5827878} />
              <ByBudgetTableRow shortCode="GRO" name="Growth" total={3433400} />
              <ByBudgetTableRow shortCode="CES" name="Collateral Engineering Services" total={3112752} />
              <ByBudgetTableRow shortCode="RISK" name="Risk " total={2633200} />
            </>
          ) : (
            <>
              <ExpenseCategoryGroup name="Headcount">
                <ByExpenseCategoryTableRow name="Compensation & Benefits" total={8230463} />
              </ExpenseCategoryGroup>
              <ExpenseCategoryGroup name="Non-Headcount">
                <ByExpenseCategoryTableRow name="Software Expense" total={3339529} />
                <ByExpenseCategoryTableRow name="Marketing" total={1968154} />
                <ByExpenseCategoryTableRow name="Gas Expense" total={1252461} />
              </ExpenseCategoryGroup>
            </>
          )}
        </TableBody>
        <TableFooter mode={selectedFilter} total={17892312} />
      </Table>
    </BreakdownTableContainer>
  );
};

export default CostBreakdownTable;

const BreakdownTableContainer = styled.div({});

const Table = styled.div<WithIsLight>(({ isLight }) => ({
  width: '100%',
  marginTop: 16,
  background: '#FFFFFF',
  borderRadius: 6,
  filter: isLight
    ? 'drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.4)) drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25))'
    : 'drop-shadow(0px 20px 40px rgba(219, 0, 0, 0.8))',
}));

const TableBody = styled.div({});
