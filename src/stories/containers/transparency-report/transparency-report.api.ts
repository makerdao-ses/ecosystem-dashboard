import { gql } from 'graphql-request';

export const CORE_UNIT_REQUEST = (shortCode: string) => ({
  query: gql`
    query CoreUnit($filter: CoreUnitFilter) {
      coreUnit(filter: $filter) {
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
      shortCode
    }
  }
});
