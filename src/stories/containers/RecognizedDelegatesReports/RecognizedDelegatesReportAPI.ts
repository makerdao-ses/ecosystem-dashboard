import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

const RECOGNIZED_DELEGATES_BUDGET_STATEMENTS_QUERY = () => ({
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
      ownerType: 'Delegates',
    },
  },
});

export const fetchRecognizedDelegatesBudgetStatements = async (): Promise<DelegatesDto> => {
  const { query, filter } = RECOGNIZED_DELEGATES_BUDGET_STATEMENTS_QUERY();

  const response = await request<{ budgetStatements: BudgetStatementDto[] }>(GRAPHQL_ENDPOINT, query, filter);
  const delegates = {
    shortCode: 'DEL',
    code: 'Delegates',
    budgetStatements: response.budgetStatements,
    activityFeed: response.budgetStatements.reduce((acc, budgetStatement) => ({
      ...acc,
      activityFeed: [...acc.activityFeed, ...budgetStatement.activityFeed],
    })).activityFeed,
  } as DelegatesDto;

  return delegates;
};
