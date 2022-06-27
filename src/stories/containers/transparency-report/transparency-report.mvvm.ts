import useSWR from 'swr';
import { CORE_UNIT_REQUEST, fetcher } from './transparency-report.api';

export const useTransparencyReportViewModel = (code: string) => {
  const { data, error } = useSWR(CORE_UNIT_REQUEST(code), fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
