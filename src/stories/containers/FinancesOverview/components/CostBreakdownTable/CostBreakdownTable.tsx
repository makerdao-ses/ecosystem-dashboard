import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
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

export interface CostBreakdownTableProps {
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
              <ByBudgetTableRow shortCode="SES" name="Sustainable Ecosystem Scaling" total={3112752} />
              <ByBudgetTableRow shortCode="RISK" name="Risk " total={2633200} />
              <ByBudgetTableRow shortCode="CES" name="Collateral" total={3112752} />
              <ByBudgetTableRow shortCode="RISK" name="Risk " total={2633200} />
              <ByBudgetTableRow shortCode="CES" name="Collateral" total={3112752} />
              <ByBudgetTableRow shortCode="RISK" name="Risk " total={2633200} />

              <RemainingContainer isLight={isLight}>
                <ByBudgetTableRow shortCode="CU" name="Remaining Core Units" total={1226382} />
                <ByBudgetTableRow shortCode="DEL" name="Remaining Recognized Delegates " total={1108500} />
              </RemainingContainer>
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
                <ByExpenseCategoryTableRow name="Software Expense" total={3339529} />
                <ByExpenseCategoryTableRow name="Marketing" total={1968154} />
                <ByExpenseCategoryTableRow name="Gas Expense" total={1252461} />
                <ByExpenseCategoryTableRow name="Gas Expense" total={1252461} />

                <RemainingContainer isLight={isLight}>
                  <ByExpenseCategoryTableRow name="All Remaining Non-Headcount" total={301568} />
                </RemainingContainer>
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
  marginTop: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    background: isLight ? '#FFFFFF' : '#1E2C37',
    borderRadius: 6,
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 16,
  },
}));

const TableBody = styled.div({});

const RemainingContainer = styled.div<WithIsLight>(({ isLight }) => ({
  margin: '24px -16px',
  padding: '24px 16px 16px',
  background: isLight ? '#F6F8F9' : '#131420',
  boxShadow: isLight ? '0px -1px 1px #EDEFFF' : '0px -1px 1px #292F5B',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '& > div': {
    marginBottom: 0,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '30px 0 0',
    padding: '2px 0 0',
    gap: 0,
    boxShadow: 'none',
  },
}));
