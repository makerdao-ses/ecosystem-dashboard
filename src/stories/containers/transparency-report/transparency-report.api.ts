import { gql } from 'graphql-request';

export const CORE_UNIT_REQUEST = (shortCode: string) => ({
  query: gql`
    query CoreUnit($filter: CoreUnitFilter) {
      coreUnit(filter: $filter) {
        code
        sentenceDescription
        name
        image
        budgetStatements {
          month
          budgetStatus
          publicationUrl
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
      }
    }
  `,
  filter: {
    filter: {
      shortCode,
    },
  },
});
