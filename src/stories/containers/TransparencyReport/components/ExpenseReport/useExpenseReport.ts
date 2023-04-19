import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHashFragment } from '@ses/core/hooks/useHashFragment';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BREAKDOWN_VIEW_QUERY_KEY } from '../../utils/constants';
import { useTransparencyActuals } from '../TransparencyActuals/useTransparencyActuals';
import { useTransparencyForecast } from '../TransparencyForecast/useTransparencyForecast';
import { useTransparencyMkrVesting } from '../TransparencyMkrVesting/useTransparencyMkrVesting';
import { useTransparencyTransferRequest } from '../TransparencyTransferRequest/useTransparencyTransferRequest';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

const useExpenseReport = (currentMonth: DateTime, budgetStatements?: BudgetStatementDto[]) => {
  const { isLight } = useThemeContext();
  const query = useRouter().query;

  // move to the hash id when the page loads
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  useHashFragment({
    offset: isMobile ? 180 : 270,
    addListeners: false,
    delayOnLoad: 300,
  });

  const actualsData = useTransparencyActuals(currentMonth, budgetStatements);
  const forecastData = useTransparencyForecast(currentMonth, budgetStatements);
  const mkrVestingData = useTransparencyMkrVesting(currentMonth, budgetStatements);
  const transferRequestsData = useTransparencyTransferRequest(currentMonth, budgetStatements);

  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(() => query[BREAKDOWN_VIEW_QUERY_KEY] === 'default');
  useEffect(() => {
    // update breakdown expanded state when its query param changes
    // this keeps both breakdown tabs content synced
    setIsBreakdownExpanded(query[BREAKDOWN_VIEW_QUERY_KEY] === 'default');
  }, [query]);

  return {
    isLight,
    actualsData,
    forecastData,
    mkrVestingData,
    transferRequestsData,
    isBreakdownExpanded,
  };
};

export default useExpenseReport;
