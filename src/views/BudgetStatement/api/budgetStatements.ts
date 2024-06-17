import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';

const getBudgetStatementsQuery = (resource: ResourceType) => ({
  query: gql`
    query ($filter: BudgetStatementFilter) {
      budgetStatements(filter: $filter) {
        id
        month
        status
        publicationUrl
        activityFeed {
          id
          created_at
          event
          params
          description
        }
        comments {
          id
          budgetStatementId
          timestamp
          comment
          status
          author {
            id
            username
          }
        }
        budgetStatementFTEs {
          month
          ftes
        }
        auditReport {
          reportUrl
          timestamp
          auditStatus
        }
        budgetStatementWallet {
          name
          address
          currentBalance
          id
          budgetStatementLineItem {
            group
            actual
            forecast
            budgetCategory
            headcountExpense
            comments
            month
            budgetCap
            payment
          }
          budgetStatementTransferRequest {
            requestAmount
            walletBalance
          }
        }
      }
    }
  `,
  filter: {
    filter: {
      ownerType: resource,
    },
  },
});

export const fetchBudgetStatements = async (resource: ResourceType): Promise<BudgetStatement[]> => {
  const { query, filter } = getBudgetStatementsQuery(resource);

  const response = await request<{ budgetStatements: BudgetStatement[] }>(GRAPHQL_ENDPOINT, query, filter);
  //   const delegates = {
  //     shortCode: 'DEL',
  //     code: 'Delegates',
  //     type: ResourceType.Delegates,
  //     budgetStatements: response.budgetStatements,
  //     activityFeed: response.budgetStatements.reduce((acc, budgetStatement) => ({
  //       ...acc,
  //       activityFeed: [...acc.activityFeed, ...budgetStatement.activityFeed],
  //     })).activityFeed,
  //   } as DelegatesDto;

  return response.budgetStatements ?? [];
};
