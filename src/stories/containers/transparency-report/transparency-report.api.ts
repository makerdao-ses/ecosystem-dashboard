import { gql } from 'graphql-request';

export const CORE_UNIT_REQUEST = (code: string) => ({
  query: gql`
    query CoreUnit($filter: CoreUnitFilter) {
      coreUnit(filter: $filter) {
        code
        name
        image
        sentenceDescription
        cuMip {
          mipStatus
          mipUrl
          formalSubmission
          accepted
          rfc
          rejected
          obsolete
          mipStatus
        }
        category
        socialMediaChannels {
          forumTag
          twitter
          youtube
          discord
          linkedIn
          website
        }
        budgetStatements {
          month
          budgetStatus
          publicationUrl
          budgetStatementFTEs {
            month
            ftes
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
      code
    }
  }
});
