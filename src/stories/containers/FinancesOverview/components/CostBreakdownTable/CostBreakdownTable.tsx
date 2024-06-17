import styled from '@emotion/styled';
import ArrowRight from '@ses/components/svg/ArrowRight';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { isCoreUnitExpense, isEcosystemActorExpense } from '../../utils/costBreakdown';
import CostBreakdownFilter from '../CostBreakdownFilter/CostBreakdownFilter';
import ByBudgetTableHeader from './ByBudgetTableHeader';
import ByBudgetTableRow from './ByBudgetTableRow';
import ByExpenseCategoryTableHeader from './ByExpenseCategoryTableHeader';
import ByExpenseCategoryTableRow from './ByExpenseCategoryTableRow';
import ExpenseCategoryGroup from './ExpenseCategoryGroup';
import TableFooter from './TableFooter';
import type { TableFooterProps } from './TableFooter';
import type { CostBreakdownFilterValue, ExtendedExpense } from '../../financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface CostBreakdownTableProps {
  selectedFilter: CostBreakdownFilterValue;
  setSelectedFilter: (value: CostBreakdownFilterValue) => void;
  byBudgetExpenses: ExtendedExpense[];
  remainingBudgetCU: ExtendedExpense;
  remainingBudgetDelegates: ExtendedExpense;
  remainingEcosystemActors: ExtendedExpense;
  maxValueByBudget: number;
  byCategoryExpenses: {
    headcount: ExpenseDto[];
    nonHeadcount: ExpenseDto[];
  };
  remainingCategories: ExpenseDto;
  maxValueByCategory: number;
  total: number;
  handleOnClick?: () => void;
}

const CostBreakdownTable: React.FC<CostBreakdownTableProps> = ({
  selectedFilter,
  setSelectedFilter,
  byBudgetExpenses,
  remainingBudgetCU,
  remainingBudgetDelegates,
  remainingEcosystemActors,
  maxValueByBudget,
  byCategoryExpenses,
  remainingCategories,
  maxValueByCategory,
  handleOnClick,
  total,
}) => {
  const { isLight } = useThemeContext();

  return (
    <BreakdownTableContainer>
      <CostBreakdownFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <Table isLight={isLight}>
        {selectedFilter === 'By budget' ? (
          <ByBudgetTableHeader />
        ) : (
          <ByExpenseCategoryTableHeader onClick={handleOnClick} />
        )}
        <TableBody>
          {selectedFilter === 'By budget' ? (
            <>
              {byBudgetExpenses.map((budget, i) => (
                <ByBudgetTableRow
                  expense={budget}
                  total={total}
                  relativePercentage={percentageRespectTo(
                    Math.max(budget.actuals, budget.prediction),
                    maxValueByBudget
                  )}
                  rowType={
                    isCoreUnitExpense(budget)
                      ? 'coreUnit'
                      : isEcosystemActorExpense(budget)
                      ? 'ecosystemActor'
                      : 'delegate'
                  }
                  key={i}
                />
              ))}

              <RemainingContainer isLight={isLight}>
                <ByBudgetTableRow
                  expense={remainingBudgetCU}
                  total={total}
                  relativePercentage={percentageRespectTo(remainingBudgetCU?.actuals, byBudgetExpenses[0]?.actuals)}
                  rowType={'remaining'}
                />
                {remainingBudgetDelegates?.actuals > 0 && (
                  <ByBudgetTableRow
                    expense={remainingBudgetDelegates}
                    total={total}
                    relativePercentage={percentageRespectTo(
                      remainingBudgetDelegates?.actuals,
                      byBudgetExpenses[0]?.actuals
                    )}
                    rowType={'remaining'}
                  />
                )}
                {remainingEcosystemActors?.actuals > 0 && (
                  <ByBudgetTableRow
                    expense={remainingEcosystemActors}
                    total={total}
                    relativePercentage={percentageRespectTo(
                      remainingEcosystemActors?.actuals,
                      byBudgetExpenses[0]?.actuals
                    )}
                    rowType={'remaining'}
                  />
                )}
              </RemainingContainer>
            </>
          ) : (
            <>
              <ContainerOpenModal isLight={isLight} onClick={handleOnClick}>
                <OpenModalText isLight={isLight}>View all Expense Categories</OpenModalText>
                <ArrowRight fill={isLight ? '#231536' : '#D2D4EF'} />
              </ContainerOpenModal>
              <ExpenseCategoryGroup name="Headcount">
                {byCategoryExpenses.headcount.map((expense, i) => (
                  <ByExpenseCategoryTableRow
                    name={pascalCaseToNormalString(expense.category.split('/')[1])}
                    expense={expense}
                    relativePercentage={percentageRespectTo(
                      Math.max(expense.actuals, expense.prediction),
                      maxValueByCategory
                    )}
                    total={total}
                    key={i}
                  />
                ))}
              </ExpenseCategoryGroup>
              <ExpenseCategoryGroup name="Non-Headcount">
                {byCategoryExpenses.nonHeadcount.map((expense, i) => (
                  <ByExpenseCategoryTableRow
                    name={pascalCaseToNormalString(expense.category.split('/')[1])}
                    expense={expense}
                    relativePercentage={percentageRespectTo(
                      Math.max(expense.actuals, expense.prediction),
                      maxValueByCategory
                    )}
                    total={total}
                    key={i}
                  />
                ))}

                <RemainingContainer isLight={isLight}>
                  <ByExpenseCategoryTableRow
                    name="All Remaining Categories"
                    expense={remainingCategories}
                    relativePercentage={percentageRespectTo(remainingCategories.actuals, maxValueByCategory)}
                    total={total}
                  />
                </RemainingContainer>
              </ExpenseCategoryGroup>
            </>
          )}
        </TableBody>
        <TableFooterStyled mode={selectedFilter} total={total} />
      </Table>
    </BreakdownTableContainer>
  );
};

export default CostBreakdownTable;

const BreakdownTableContainer = styled.div({});

const Table = styled.div<WithIsLight>(({ isLight }) => ({
  width: '100%',
  marginTop: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    background: isLight ? '#FFFFFF' : '#1E2C37',
    borderRadius: 6,
    marginTop: 25,
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 24,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 15,
  },
}));

const TableBody = styled.div({});

const RemainingContainer = styled.div<WithIsLight>(({ isLight }) => ({
  margin: '24px -16px',
  padding: '24px 16px 16px',
  background: isLight ? '#F6F8F9' : '#1D1E34',
  boxShadow: isLight ? '0px -1px 1px #EDEFFF' : '0px -1px 1px #292F5B',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '& > *': {
    marginBottom: 0,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    margin: '32px 0 0',
    padding: 0,
    gap: 0,
    boxShadow: 'none',
  },
}));

const OpenModalText = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter ,sans-serif',
  fontWeight: 400,
  fontSize: 13,
  lineHeight: '18px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const ContainerOpenModal = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 34,
  justifyContent: 'space-between',
  alignItems: 'center',
  background: isLight ? '#F6F8F9' : '#343442',

  border: isLight ? '1px solid #D4D9E1' : '1px solid #48495F',
  borderRadius: '6px',
  padding: '8px 16px 8px 16px',
  marginTop: -2,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const TableFooterStyled = styled(TableFooter)<TableFooterProps>(({ mode }) => ({
  paddingTop: mode === 'By budget' ? 10 : 8,
}));
