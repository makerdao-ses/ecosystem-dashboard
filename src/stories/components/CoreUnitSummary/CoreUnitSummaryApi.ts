import request, { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

const CORE_UNITS_REQUEST = {
  query: gql`
    query CoreUnits {
      coreUnits {
        id
        code
        shortCode
        name
        image
        category
        sentenceDescription
        cuMip {
          mipCode
          mipStatus
          mipUrl
          formalSubmission
          accepted
          rfc
          rejected
          obsolete
        }
        socialMediaChannels {
          forumTag
          twitter
          youtube
          discord
          linkedIn
          website
          github
        }
        budgetStatements {
          month
          budgetStatementWallet {
            budgetStatementLineItem {
              actual
              month
            }
          }
        }
      }
    }
  `,
};

export const fetchCoreUnits = async () => {
  const res = (await request(GRAPHQL_ENDPOINT, CORE_UNITS_REQUEST.query)) as { coreUnits: CoreUnitDto[] };
  return res?.coreUnits?.filter((coreUnit) => coreUnit.shortCode.toLocaleLowerCase() !== 'del');
};
