import { request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';

export const fetcher = ({ query, filter }: { query: string; filter: JSON }) => request(GRAPHQL_ENDPOINT, query, filter);
