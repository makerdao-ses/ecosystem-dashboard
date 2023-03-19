import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import { getShortCode } from '@ses/core/utils/string';
import request, { gql } from 'graphql-request';
import { isCoreUnitExpense } from '../utils/costBreakdown';
import type { ExtendedExpense } from '../financesOverviewTypes';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export const totalExpensesQuery = (granularity: ExpenseGranularity, budgets: string) => ({
  query: gql`
    query TotalExpenses($filter: AggregateExpensesFilter) {
      totalQuarterlyExpenses(filter: $filter) {
        reports {
          expenses {
            actuals
            budget
            budgetCap
            discontinued
            period
            prediction
          }
        }
      }
    }
  `,
  filter: {
    filter: {
      budgets,
      granularity,
    },
  },
});

export const costBreakdownExpensesQuery = () => ({
  query: gql`
    query CostBreakdownExpenses($filter: AggregateExpensesFilter) {
      totalQuarterlyExpenses(filter: $filter) {
        reports {
          expenses {
            actuals
            budget
            budgetCap
            discontinued
            period
            prediction
          }
        }
      }
      coreUnits {
        shortCode
        name
      }
    }
  `,
  filter: {
    filter: {
      budgets: 'makerdao/*:*/*:*',
      granularity: ExpenseGranularity.annual,
    },
  },
});

export const fetchExpenses = async (granularity: ExpenseGranularity, budgets = 'makerdao/*'): Promise<ExpenseDto[]> => {
  const { query, filter } = totalExpensesQuery(granularity, budgets);
  const res = (await request(GRAPHQL_ENDPOINT, query, filter)) as {
    totalQuarterlyExpenses: { reports: { expenses: ExpenseDto[] } };
  };
  return res.totalQuarterlyExpenses.reports.expenses;
};

export const fetchCostBreakdownExpenses = async (): Promise<ExtendedExpense[]> => {
  const { query, filter } = costBreakdownExpensesQuery();
  const res = (await request(GRAPHQL_ENDPOINT, query, filter)) as {
    totalQuarterlyExpenses: { reports: { expenses: ExpenseDto[] } };
    coreUnits: CoreUnitDto[];
  };

  const expenses = res.totalQuarterlyExpenses.reports.expenses;
  const coreUnitsMap = new Map<string, CoreUnitDto>();
  res.coreUnits.forEach((cu) => coreUnitsMap.set(cu.shortCode, cu));

  const extendedExpenses = expenses.map((expense) => {
    if (isCoreUnitExpense(expense)) {
      const shortCode = getShortCode(expense.budget.replace('makerdao/core-units/', ''));
      return {
        ...expense,
        shortCode,
        name: coreUnitsMap.get(shortCode)?.name,
      } as ExtendedExpense;
    } else {
      // it is a delegate expense
      // TODO: extend with the delegate name
      return expense as ExtendedExpense;
    }
  });

  return extendedExpenses;
};
