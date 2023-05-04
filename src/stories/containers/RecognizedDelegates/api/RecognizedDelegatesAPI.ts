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
