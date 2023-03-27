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
    query CostBreakdownExpenses($filter1: AggregateExpensesFilter, $filter2: AggregateExpensesFilter) {
      byBudget: totalQuarterlyExpenses(filter: $filter1) {
        reports {
          expenses {
            category
            actuals
            budget
            budgetCap
            discontinued
            period
            prediction
          }
        }
      }
      byCategory: totalQuarterlyExpenses(filter: $filter2) {
        reports {
          expenses {
            category
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
    filter1: {
      budgets: 'makerdao/*:*/*:*',
      granularity: ExpenseGranularity.annual,
    },
    filter2: {
      budgets: 'makerdao',
      granularity: ExpenseGranularity.annual,
      categories: '*:*/*:*',
    },
  },
});

export const fetchExpenses = async (granularity: ExpenseGranularity, budgets = 'makerdao/*'): Promise<ExpenseDto[]> => {
  const { query, filter } = totalExpensesQuery(granularity, budgets);
  const res = await request<{
    totalQuarterlyExpenses: { reports: { expenses: ExpenseDto[] } };
  }>(GRAPHQL_ENDPOINT, query, filter);
  return res.totalQuarterlyExpenses.reports.expenses;
};

export const fetchCostBreakdownExpenses = async (): Promise<{
  byBudget: ExtendedExpense[];
  byCategory: ExpenseDto[];
}> => {
  const { query, filter } = costBreakdownExpensesQuery();
  const res = await request<{
    byBudget: { reports: { expenses: ExpenseDto[] } };
    byCategory: { reports: { expenses: ExpenseDto[] } };
    coreUnits: CoreUnitDto[];
  }>(GRAPHQL_ENDPOINT, query, filter);

  const coreUnitsMap = new Map<string, CoreUnitDto>();
  res.coreUnits.forEach((cu) => coreUnitsMap.set(cu.shortCode, cu));

  const byBudget = res.byBudget.reports.expenses.map((expense) => {
    if (isCoreUnitExpense(expense)) {
      const shortCode = getShortCode(expense.budget.replace('makerdao/core-units/', ''));
      return {
        ...expense,
        shortCode,
        name: coreUnitsMap.get(shortCode)?.name,
      } as ExtendedExpense;
    }
    // it is a delegate expense
    // it is supposed to be only one DEL expense per year
    return {
      ...expense,
      name: 'Recognized Delegates',
      shortCode: 'DEL',
    } as ExtendedExpense;
  });

  return {
    byBudget,
    byCategory: res.byCategory.reports.expenses,
  };
};
