import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import { getAuthFromStorage } from './auth-storage';

export type GraphQLFetcherOptions = {
  query: string;
  input?: JSON;
};

export const fetcher = ({ query, input }: GraphQLFetcherOptions) => {
  const auth = getAuthFromStorage();

  const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: auth?.authToken
      ? {
          authorization: `Bearer ${auth?.authToken}`,
        }
      : {},
  });

  return graphQLClient.request(query, input);
};
