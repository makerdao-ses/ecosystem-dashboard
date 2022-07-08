import useSWR from 'swr';
import { CORE_UNIT_REQUEST } from './transparency-report.api';
import { fetcher } from '../../../core/utils/fetcher';

export const useTransparencyReportViewModel = (code: string) => {
  const { data, error } = useSWR(code ? CORE_UNIT_REQUEST(code) : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
