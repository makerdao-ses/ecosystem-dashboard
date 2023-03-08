import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { ExpenseDto, ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';

export const totalExpensesAPI = (granularity: ExpenseGranularity) => ({
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
      budgets: 'makerdao/*',
      granularity,
    },
  },
});

export const fetchExpenses = async (granularity: ExpenseGranularity): Promise<ExpenseDto[]> => {
  const { query, filter } = totalExpensesAPI(granularity);
  const res = (await request(GRAPHQL_ENDPOINT, query, filter)) as {
    totalQuarterlyExpenses: { reports: { expenses: ExpenseDto[] } };
  };
  return res.totalQuarterlyExpenses.reports.expenses;
};
