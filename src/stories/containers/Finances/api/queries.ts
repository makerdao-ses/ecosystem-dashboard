import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';

import request, { gql } from 'graphql-request';
import type { BudgetsFinances } from '../utils/types';

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

export const fetchBudgetsFinances = async (): Promise<BudgetsFinances[]> => {
  const { query } = AllBudgets();
  const res = await request<{
    budgets: BudgetsFinances[];
  }>(GRAPHQL_ENDPOINT, query);

  return res.budgets;
};
