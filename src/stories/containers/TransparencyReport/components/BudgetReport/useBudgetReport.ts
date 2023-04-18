import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useCallback, useState } from 'react';
import { useTransparencyActuals } from '../TransparencyActuals/useTransparencyActuals';
import { useTransparencyForecast } from '../TransparencyForecast/useTransparencyForecast';
import { useTransparencyMkrVesting } from '../TransparencyMkrVesting/useTransparencyMkrVesting';
import { useTransparencyTransferRequest } from '../TransparencyTransferRequest/useTransparencyTransferRequest';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

const useBudgetReport = (currentMonth: DateTime, budgetStatements?: BudgetStatementDto[]) => {
  const { isLight } = useThemeContext();

  const actualsData = useTransparencyActuals(currentMonth, budgetStatements);
  const forecastData = useTransparencyForecast(currentMonth, budgetStatements);
  const mkrVestingData = useTransparencyMkrVesting(currentMonth, budgetStatements);
  const transferRequestsData = useTransparencyTransferRequest(currentMonth, budgetStatements);

  const [breakdownSelected, setBreakdownSelected] = useState<string | undefined>();
  const handleBreakdownChange = useCallback((current?: string) => {
    setBreakdownSelected(current);
  }, []);

  return {
    isLight,
    actualsData,
    forecastData,
    mkrVestingData,
    transferRequestsData,
    breakdownSelected,
    handleBreakdownChange,
  };
};

export default useBudgetReport;
