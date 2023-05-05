import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export const GET_RECOGNIZED_DELEGATES = gql`
  query RecognizedDelegates {
    recognizedDelegates {
      name
      image
      latestVotingContract
      socials {
        forumProfile
        forumPlatform
        youtube
        twitter
        votingPortal
      }
    }
  }
`;

export const delegateNumbers = () => ({
  query: gql`
    query Query($filter: AggregateExpensesFilter) {
      totalQuarterlyExpenses(filter: $filter) {
        reports {
          expenses {
            period
            budget
            actuals
            prediction
            budgetCap
            discontinued
            category
          }
        }
      }
    }
  `,
  filter: {
    filter: {
      budgets: 'makerdao/delegates:*/*/*:*',
      granularity: 'total',
      start: null,
      end: null,
    },
  },
});

export const recognizedDelegateDoughnutChart = () => ({
  query: gql`
    query TotalQuarterlyExpenses($f1: AggregateExpensesFilter, $f2: AggregateExpensesFilter) {
      delegatesExpenses: totalQuarterlyExpenses(filter: $f1) {
        reports {
          expenses {
            period
            budget
            actuals
          }
        }
      }
      totalExpenses: totalQuarterlyExpenses(filter: $f2) {
        reports {
          expenses {
            period
            budget
            actuals
          }
        }
      }
    }
  `,
  filter: {
    f1: {
      budgets: 'makerdao/delegates:*/',
      end: '2023/03',
      start: '2021/11',
      granularity: 'total',
    },
    f2: {
      budgets: 'makerdao/*',
      end: '2023/03',
      start: '2021/11',
      granularity: 'total',
    },
  },
});

interface RecognizedDelegatesResponse {
  recognizedDelegates: RecognizedDelegatesDto[];
}

export const fetchRecognizedDelegates = async (): Promise<RecognizedDelegatesDto[]> => {
  const response = (await request(GRAPHQL_ENDPOINT, GET_RECOGNIZED_DELEGATES)) as RecognizedDelegatesResponse;
  return response.recognizedDelegates;
};

export const fetchDelegatesNumbers = async (): Promise<ExpenseDto[]> => {
  const { query, filter } = delegateNumbers();
  const res = await request<{
    totalQuarterlyExpenses: { reports: { expenses: ExpenseDto[] } };
  }>(GRAPHQL_ENDPOINT, query, filter);
  return res.totalQuarterlyExpenses.reports.expenses;
};

export const fetchRecognizedDelegateDoughnutChart = async (): Promise<{
  delegatesExpenses: ExpenseDto[];
  totalExpenses: ExpenseDto[];
}> => {
  const { query, filter } = recognizedDelegateDoughnutChart();
  const res = await request<{
    delegatesExpenses: { reports: { expenses: ExpenseDto[] } };
    totalExpenses: { reports: { expenses: ExpenseDto[] } };
  }>(GRAPHQL_ENDPOINT, query, filter);

  return {
    delegatesExpenses: res.delegatesExpenses.reports.expenses,
    totalExpenses: res.totalExpenses.reports.expenses,
  };
};
