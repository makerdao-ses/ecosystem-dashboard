import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { DelegatesDto } from '@ses/core/models/dto/delegates.dto';

export const DELEGATES_REQUEST = () => ({
  query: gql`
    query CoreUnits($filter: CoreUnitFilter) {
      coreUnits(filter: $filter) {
        id
        code
        shortCode
        budgetStatements {
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
        activityFeed {
          id
          created_at
          event
          params
          description
        }
      }
    }
  `,
  filter: {
    filter: {
      shortCode: 'DEL',
    },
  },
});

export const fetchRecognizedDelegates = async (): Promise<DelegatesDto> => {
  const { query: gqlQuery, filter } = DELEGATES_REQUEST();

  const response = await request<{ coreUnits: [DelegatesDto] }>(GRAPHQL_ENDPOINT, gqlQuery, filter);
  return response.coreUnits[0];
};
