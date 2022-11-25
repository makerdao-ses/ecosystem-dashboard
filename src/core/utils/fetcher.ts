import { request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import { getAuthFromStorage } from './auth-storage';

export type GraphQLFetcherOptions = {
  query: string;
  filter?: JSON;
};

export const fetcher = ({ query, filter }: GraphQLFetcherOptions) => request(GRAPHQL_ENDPOINT, query, filter);

export const authFetcher = (query: string) => {
  const auth = getAuthFromStorage();

  if (auth?.authToken) {
    return request(GRAPHQL_ENDPOINT, query, null, {
      Authorization: `Bearer ${auth?.authToken}`,
    });
  }

  return request(GRAPHQL_ENDPOINT, query);
};
