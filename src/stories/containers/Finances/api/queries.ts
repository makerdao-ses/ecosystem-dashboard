import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const AllBudgets = () => ({
  query: gql`
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
  `,
});

export const fetchBudgetsFinances = async (): Promise<Budget[]> => {
  const { query } = AllBudgets();
  const res = await request<{
    budgets: Budget[];
  }>(GRAPHQL_ENDPOINT, query);

  return res.budgets;
};
