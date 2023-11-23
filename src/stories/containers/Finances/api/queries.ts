import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Analytic, AnalyticFilter } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const fetchBudgets = async (): Promise<Budget[]> => {
  const query = gql`
    query Budgets {
      budgets {
        id
        parentId
        name
        code
        idPath
        codePath
        image
        description
      }
    }
  `;

  const res = await request<{
    budgets: Budget[];
  }>(GRAPHQL_ENDPOINT, query);

  return res.budgets;
};

export const fetchAnalytics = async (
  granularity: 'total' | 'annual' | 'semiAnnual' | 'quarterly' | 'monthly' | 'weekly' | 'daily' | 'hourly',
  initialYear: string,
  select: string,
  lod: number
): Promise<Analytic> => {
  const query = gql`
    query Analytics($filter: AnalyticsFilter) {
      analytics(filter: $filter) {
        series {
          period
          start
          end
          rows {
            dimensions {
              name
              path
            }
            metric
            unit
            value
            sum
          }
        }
      }
    }
  `;

  const filter: AnalyticFilter = {
    filter: {
      granularity,
      start: `${initialYear}-01-01`,
      end: `${Number(initialYear) + 1}-01-01`,
      metrics: ['Actuals', 'Budget', 'Forecast', 'PaymentsOnChain', 'PaymentsOffChainIncluded'],
      currency: 'DAI',
      dimensions: [
        {
          name: 'budget',
          select,
          lod,
        },
      ],
    },
  };

  const res = await request<{
    analytics: Analytic;
  }>(GRAPHQL_ENDPOINT, query, filter);

  return res.analytics;
};
