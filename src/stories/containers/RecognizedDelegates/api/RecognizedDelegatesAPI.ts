import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto, ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

interface RecognizedDelegatesResponse {
  recognizedDelegates: RecognizedDelegatesDto[];
}

export const fetchRecognizedDelegates = async (): Promise<RecognizedDelegatesDto[]> => {
  const query = gql`
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
  const response = (await request(GRAPHQL_ENDPOINT, query)) as RecognizedDelegatesResponse;
  return response.recognizedDelegates;
};

export const fetchTotalExpenses = async (): Promise<number> => {
  const query = gql`
    query TotalQuarterlyExpenses($filter: AggregateExpensesFilter) {
      totalExpenses: totalQuarterlyExpenses(filter: $filter) {
        reports {
          expenses {
            period
            budget
            actuals
          }
        }
      }
    }
  `;
  const filter = {
    filter: {
      budgets: 'makerdao/*',
      end: '2023/03',
      start: '2021/11',
      granularity: 'total',
    },
  };
  const res = await request<{
    totalExpenses: { reports: { expenses: ExpenseDto[] } };
  }>(GRAPHQL_ENDPOINT, query, filter);

  return res.totalExpenses.reports.expenses?.[0]?.actuals ?? 0;
};

export const fetchDelegatesAnalytics = async (granularity: ExpenseGranularity): Promise<Analytic> => {
  const query = gql`
    query Analytics($filter: AnalyticsFilter) {
      analytics(filter: $filter) {
        series {
          period
          start
          end
          rows {
            dimensions {
              path
              name
            }
            metric
            value
            sum
          }
        }
      }
    }
  `;

  const filter = {
    filter: {
      start: '2021-11-01',
      end: '2023-04-01',
      granularity,
      metrics: ['Actuals'],
      dimensions: [
        {
          name: 'budget',
          select: 'atlas/legacy/recognized-delegates',
          lod: 5,
        },
        {
          name: 'project',
          select: 'atlas',
          lod: 2,
        },
      ],
      currency: 'DAI',
    },
  };

  const res = await request<{
    analytics: Analytic;
  }>(GRAPHQL_ENDPOINT, query, filter);

  return res.analytics;
};
