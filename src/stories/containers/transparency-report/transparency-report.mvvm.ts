import { fetchWalletsForCoreUnit } from './transparency-report.api';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { useEffect, useState } from 'react';

export const useTransparencyReportViewModel = (code: string) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchCoreUnit = () => fetchWalletsForCoreUnit(code);

  return {
    data: data && data.length > 0 ? data[0] as CoreUnitDto : null,
    isLoading: !error && !data,
    error,
    fetchCoreUnit,
  };
};
