import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import { getShortCode } from '@ses/core/utils/string';
import request, { gql } from 'graphql-request';
import { isCoreUnitExpense, isEcosystemActorExpense } from '../utils/costBreakdown';
import type { ExtendedExpense } from '../financesOverviewTypes';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { Team } from '@ses/core/models/interfaces/team';

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
      teams {
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

export const expenseCategoriesQuery = () => ({
  query: gql`
    query ExpenseCategories {
      expenseCategories {
        id
        parentId
        order
        name
        headcountExpense
      }
    }
  `,
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
    teams: Team[];
  }>(GRAPHQL_ENDPOINT, query, filter);

  const coreUnitsMap = new Map<string, CoreUnitDto>();
  const teamsMap = new Map<string, Team>();

  res.coreUnits.forEach((cu) => coreUnitsMap.set(cu.shortCode, cu));
  res.teams.forEach((team) => teamsMap.set(team.shortCode, team));

  const byBudget = res.byBudget.reports.expenses.map((expense) => {
    if (isCoreUnitExpense(expense)) {
      const shortCode = getShortCode(expense.budget.replace('makerdao/core-units/', ''));
      return {
        ...expense,
        shortCode,
        name: coreUnitsMap.get(shortCode)?.name ?? 'Unknown',
      } as ExtendedExpense;
    }
    if (isEcosystemActorExpense(expense)) {
      const shortCode = getShortCode(expense.budget.replace('makerdao/ecosystem-actors/', ''));
      return {
        ...expense,
        shortCode,
        name: teamsMap.get(shortCode)?.name ?? 'Unknown',
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

export const fetchExpenseCategories = async (): Promise<ExpenseCategory[]> => {
  const { query } = expenseCategoriesQuery();
  const res = await request<{
    expenseCategories: ExpenseCategory[];
  }>(GRAPHQL_ENDPOINT, query);

  return res.expenseCategories;
};
