import useSWR from 'swr';
import { gql, request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';

const fetcher = ({ query, filter } : { query: string, filter: JSON}) => request(GRAPHQL_ENDPOINT, query, filter);

export const fetchWalletsForCoreUnit = (code: string) => {
  const { data, error } = useSWR({
    query: gql`
    query CoreUnit($filter: CoreUnitFilter) {
      coreUnit(filter: $filter) {
        code
        name
        image
        cuMip {
          mipStatus
        }
        category
        budgetStatements {
          budgetStatementWallet {
            name
            budgetStatementLineItem {
              actual
              forecast
            }
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
  }, fetcher);

  if (!code) {
    return {
      data: null,
      error: null
    };
  }

  return {
    data,
    error
  };
};
