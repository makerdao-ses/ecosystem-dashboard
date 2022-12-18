import { gql } from 'graphql-request';

export const CORE_UNIT_REQUEST = (shortCode: string) => ({
  query: gql`
    query CoreUnit($filter: CoreUnitFilter) {
      coreUnit(filter: $filter) {
        id
        code
        shortCode
        sentenceDescription
        name
        image
        legacyBudgetStatementUrl
        auditors {
          id
          username
        }
        budgetStatements {
          id
          month
          status
          publicationUrl
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
            }
          }
          budgetStatementMKRVest {
            id
            mkrAmount
            mkrAmountOld
            vestingDate
            comments
          }
        }
        lastActivity {
          id
          created_at
          event
          params
          description
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
      shortCode,
    },
  },
});
