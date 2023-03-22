import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { isCoreUnitExpense } from '../../utils/costBreakdown';
import CostBreakdownFilter from '../CostBreakdownFilter/CostBreakdownFilter';
import ByBudgetTableHeader from './ByBudgetTableHeader';
import ByBudgetTableRow from './ByBudgetTableRow';
import ByExpenseCategoryTableHeader from './ByExpenseCategoryTableHeader';
import ByExpenseCategoryTableRow from './ByExpenseCategoryTableRow';
import ExpenseCategoryGroup from './ExpenseCategoryGroup';
import TableFooter from './TableFooter';
import type { CostBreakdownFilterValue, ExtendedExpense } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface CostBreakdownTableProps {
  selectedFilter: CostBreakdownFilterValue;
  setSelectedFilter: (value: CostBreakdownFilterValue) => void;
  byBudgetExpenses: ExtendedExpense[];
  remainingBudgetCU: ExtendedExpense;
  remainingBudgetDelegates: ExtendedExpense;
  total: number;
}

const CostBreakdownTable: React.FC<CostBreakdownTableProps> = ({
  selectedFilter,
  setSelectedFilter,
  byBudgetExpenses,
  remainingBudgetCU,
  remainingBudgetDelegates,
  total,
}) => {
  const { isLight } = useThemeContext();

  return (
    <BreakdownTableContainer>
      <CostBreakdownFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <Table isLight={isLight}>
        {selectedFilter === 'By budget' ? <ByBudgetTableHeader /> : <ByExpenseCategoryTableHeader />}
        <TableBody>
          {selectedFilter === 'By budget' ? (
            <>
              {byBudgetExpenses.map((budget, i) => (
                <ByBudgetTableRow
                  expense={budget}
                  total={total}
                  relativePercentage={
                    i === 0 ? 100 : percentageRespectTo(byBudgetExpenses[i].prediction, byBudgetExpenses[0].prediction)
                  }
                  rowType={isCoreUnitExpense(budget) ? 'coreUnit' : 'delegate'}
                  key={i}
                />
              ))}

              <RemainingContainer isLight={isLight}>
                <ByBudgetTableRow
                  expense={remainingBudgetCU}
                  total={total}
                  relativePercentage={percentageRespectTo(
                    remainingBudgetCU?.prediction,
                    byBudgetExpenses[0]?.prediction
                  )}
                  rowType={'remaining'}
                />
                <ByBudgetTableRow
                  expense={remainingBudgetDelegates}
                  total={total}
                  relativePercentage={percentageRespectTo(
                    remainingBudgetDelegates?.prediction,
                    byBudgetExpenses[0]?.prediction
                  )}
                  rowType={'remaining'}
                />
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
                  <ByExpenseCategoryTableRow name="All Remaining Categories" total={301568} />
                </RemainingContainer>
              </ExpenseCategoryGroup>
            </>
          )}
        </TableBody>
        <TableFooter mode={selectedFilter} total={total} />
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
    marginTop: 25,
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 15,
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
