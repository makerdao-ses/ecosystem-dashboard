import { CORE_UNIT_REQUEST } from './transparency-report.api';
import { request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';

export const useTransparencyReportViewModel = async(code: string) => {
  const { query, filter } = CORE_UNIT_REQUEST(code);
  const data = await request(GRAPHQL_ENDPOINT, query, filter);

  return {
    data,
    isLoading: false,
  };
};
