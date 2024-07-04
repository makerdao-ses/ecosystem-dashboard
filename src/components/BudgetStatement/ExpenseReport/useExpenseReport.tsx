import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useHashFragment } from '@ses/core/hooks/useHashFragment';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { InternalTabsProps } from '@/components/Tabs/Tabs';
import { BREAKDOWN_VIEW_QUERY_KEY } from '@/views/CoreUnitBudgetStatement/utils/constants';
import { useTransparencyActuals } from '../BudgetStatementActuals/useBudgetStatementActuals';
import { useTransparencyForecast } from '../BudgetStatementForecast/useBudgetStatementForecast';
import { useTransparencyMkrVesting } from '../BudgetStatementMkrVesting/useBudgetStatementMkrVesting';
import { useTransparencyTransferRequest } from '../BudgetStatementTransferRequest/useBudgetStatementTransferRequest';
import ExpenseSection from './components/ExpenseSection/ExpenseSection';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { DateTime } from 'luxon';

const useExpenseReport = (currentMonth: DateTime, budgetStatements?: BudgetStatement[]) => {
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

  const [L2SectionInner, L2SectionOuter] = useMemo(
    () => [
      isMobile
        ? ({ children }: React.PropsWithChildren) => <ExpenseSection level={2}>{children}</ExpenseSection>
        : React.Fragment,
      isMobile
        ? React.Fragment
        : ({ children }: React.PropsWithChildren) => <ExpenseSection level={2}>{children}</ExpenseSection>,
    ],
    [isMobile]
  );

  // sync the actuals and the forecast breakdown tabs expanded state
  const [handleActualsBreakdownExpand, setHandleActualsBreakdownExpand] =
    useState<(inExpanded: boolean) => void | undefined>();
  const [handleForecastBreakdownExpand, setHandleForecastBreakdownExpand] =
    useState<(inExpanded: boolean) => void | undefined>();

  const onActualsBreakdownTabsInit = useCallback(({ setExpanded }: InternalTabsProps) => {
    setHandleActualsBreakdownExpand(() => setExpanded);
  }, []);
  const onForecastBreakdownTabsInit = useCallback(({ setExpanded }: InternalTabsProps) => {
    setHandleForecastBreakdownExpand(() => setExpanded);
  }, []);

  const onActualsBreakdownExpand = useCallback(
    (isExpanded: boolean) => {
      handleForecastBreakdownExpand?.(isExpanded);
    },
    [handleForecastBreakdownExpand]
  );

  const onForecastBreakdownExpand = useCallback(
    (isExpanded: boolean) => {
      handleActualsBreakdownExpand?.(isExpanded);
    },
    [handleActualsBreakdownExpand]
  );

  return {
    isMobile,
    L2SectionInner,
    L2SectionOuter,
    isLight,
    actualsData,
    forecastData,
    mkrVestingData,
    transferRequestsData,
    isBreakdownExpanded,
    onActualsBreakdownTabsInit,
    onForecastBreakdownTabsInit,
    onActualsBreakdownExpand,
    onForecastBreakdownExpand,
  };
};

export default useExpenseReport;
