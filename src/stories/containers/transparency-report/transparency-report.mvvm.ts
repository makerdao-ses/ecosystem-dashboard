import useSWR from 'swr';
import { CORE_UNIT_REQUEST, fetcher } from './transparency-report.api';

export const useTransparencyReportViewModel = (code: string) => {
  const { data, error } = useSWR(code ? CORE_UNIT_REQUEST(code) : null, fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
