import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { getMetricByPeriod } from '@ses/containers/Finances/utils/utils';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { convertFilterToGranularity, getHeaderValuesByPeriod, getSummaryFromHeaderValues } from './utils';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { PeriodicSelectionFilter } from '@ses/containers/Finances/utils/types';
import type { BreakdownBudgetAnalytic, BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface MetricValues {
  Actuals: number;
  Budget: number;
  PaymentsOnChain: number;
  Forecast: number;
  PaymentsOffChainIncluded: number;
}
interface TableData {
  [key: string]: Record<string, MetricValues>;
}

export const useBreakdownTable = (
  budgetsAnalytics: BudgetAnalytic | undefined,
  budgetsAnalyticsSemiAnnual: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined,
  year: string,
  budgets: Budget[],
  allBudgets: Budget[]
) => {
  const router = useRouter();

  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesk1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const isDesk1920 = useMediaQuery(lightTheme.breakpoints.up('desktop_1920'));
  const initialValue: PeriodicSelectionFilter = isMobile ? 'Semi-annual' : 'Quarterly';
  const [periodFilter, setPeriodFilter] = useState<PeriodicSelectionFilter>(initialValue);
  const metricsFilter = useMemo(
    () => ['Budget', 'Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain'],
    []
  );
  const val = useMemo(
    () => getMetricByPeriod(periodFilter, isMobile, isTable, isDesk1024, isDesk1280, isDesk1440, isDesk1920),
    [isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, periodFilter]
  );
  const [activeMetrics, setActiveMetrics] = useState<string[]>(metricsFilter.slice(0, val));
  const maxItems = val;
  const minItems = 1;

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const selectedGranularity = convertFilterToGranularity(periodFilter);

  // fetch data from the API
  const { data: analytics2, error: error2 } = useSWRImmutable([selectedGranularity, year, 'atlas', 3], async () =>
    fetchAnalytics(selectedGranularity, year, 'atlas', 3)
  );

  const structuredTableData = useMemo(() => {
    // occurred an error or the data is loading
    if (error2 || !analytics2) {
      return null;
    }

    const data = {} as TableData;

    analytics2.series.forEach((series) => {
      series.rows.forEach((row) => {
        const path = row.dimensions[0].path;
        if (!data[path]) {
          // create the path as it does not exist
          data[path] = {};
        }
        if (!data[path][series.period]) {
          // create the period as it does not exist
          data[path][series.period] = {
            Actuals: 0,
            Budget: 0,
            PaymentsOnChain: 0,
            Forecast: 0,
            PaymentsOffChainIncluded: 0,
          };
        }

        // add the metric value to the period
        data[path][series.period][row.metric] += row.value;
      });
    });

    return data;
  }, [analytics2, error2]);

  const headerTotals = useMemo(() => {
    if (!structuredTableData) {
      return null;
    }

    const totalByPeriods = {} as Record<string, MetricValues>;
    Object.keys(structuredTableData).forEach((path) => {
      Object.keys(structuredTableData[path]).forEach((period) => {
        if (!totalByPeriods[period]) {
          totalByPeriods[period] = {
            Actuals: 0,
            Budget: 0,
            PaymentsOnChain: 0,
            Forecast: 0,
            PaymentsOffChainIncluded: 0,
          };
        }

        totalByPeriods[period].Actuals += structuredTableData[path][period].Actuals;
        totalByPeriods[period].Budget += structuredTableData[path][period].Budget;
        totalByPeriods[period].PaymentsOnChain += structuredTableData[path][period].PaymentsOnChain;
        totalByPeriods[period].Forecast += structuredTableData[path][period].Forecast;
        totalByPeriods[period].PaymentsOffChainIncluded += structuredTableData[path][period].PaymentsOffChainIncluded;
      });
    });

    return totalByPeriods;
  }, [structuredTableData]);
  console.log('>>>>', headerTotals);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // fetch data from the API
  const { data: analytics, error } = useSWRImmutable(
    ['analytics', year, convertFilterToGranularity(periodFilter)],
    async () => fetchAnalytics(convertFilterToGranularity(periodFilter), year, 'atlas', 3)
  );
  console.log(budgets, allBudgets);
  const isLoading = !analytics && !error;
  // Avoid select all items when is mobile and different annually filter
  const allowSelectAll = !!(periodFilter === 'Annually' && !isMobile);
  const popupContainerHeight = allowSelectAll ? 250 : 210;

  // Show correct value in the filter when got from useMediaQuery
  useEffect(() => {
    if (isMobile) {
      setPeriodFilter('Semi-annual');
    } else {
      setPeriodFilter('Quarterly');
    }
  }, [isMobile]);

  // Default metric per dimension
  useEffect(() => {
    if (periodFilter === 'Quarterly') {
      if (isTable) {
        setActiveMetrics(metricsFilter.slice(0, val));
      }
      if (isDesk1024 || isDesk1280 || isDesk1440) {
        setActiveMetrics(metricsFilter.slice(0, val));
      }
      if (isDesk1920) {
        setActiveMetrics(metricsFilter.slice(0, val));
      }
    }
    if (periodFilter === 'Monthly') {
      setActiveMetrics(metricsFilter.slice(0, val));
    }
    if (periodFilter === 'Annually') {
      if (isMobile) {
        setActiveMetrics(metricsFilter.slice(0, val));
      } else {
        setActiveMetrics(metricsFilter.slice(0, val));
      }
    }
    if (periodFilter === 'Semi-annual') {
      setActiveMetrics(metricsFilter.slice(0, val));
    }
  }, [isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, metricsFilter, periodFilter, val]);

  // Only show monthly filter in dimension bigger than isDesk1440
  useEffect(() => {
    const handleResize = () => {
      if (periodFilter === 'Monthly' && (isMobile || isDesk1024 || isDesk1280)) {
        setPeriodFilter('Quarterly');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesk1024, isDesk1280, isDesk1440, isMobile, periodFilter]);

  const routes = ['Finances'];

  const totalCardsNavigation = 34223;
  const handleSelectChangeMetrics = (value: string[]) => {
    setActiveMetrics(value);
  };
  const handleResetMetrics = () => {
    setActiveMetrics(metricsFilter.slice(0, val));
  };
  const defaultMetricsWithAllSelected = metricsFilter.slice(0, val);
  const periodicSelectionFilter = isMobile
    ? ['Annually', 'Semi-annual']
    : isTable || isDesk1024 || isDesk1280
    ? ['Annually', 'Quarterly']
    : ['Annually', 'Quarterly', 'Monthly'];

  const handlePeriodChange = (value: string) => {
    setPeriodFilter(value as PeriodicSelectionFilter);
  };

  const selectMetrics = useMemo(
    () =>
      sortBy(metricsFilter, (item) => item).map((filter) => ({
        id: filter,
        content: filter,
      })) as MultiSelectItem[],
    [metricsFilter]
  );
  const trailingAddress = routes.map((adr) => ({
    label: adr,
    url: router.asPath,
  }));

  const headerValuesTable = getHeaderValuesByPeriod(
    periodFilter,
    year,
    budgetsAnalyticsQuarterly,
    budgetsAnalyticsMonthly,
    budgetsAnalytics,
    budgetsAnalyticsSemiAnnual,
    activeMetrics
  );

  const summaryTotalTable = getSummaryFromHeaderValues(headerValuesTable);

  return {
    isMobile,
    initialValue,
    periodFilter,
    activeMetrics,
    maxItems,
    minItems,
    allowSelectAll,
    popupContainerHeight,
    totalCardsNavigation,
    routes,
    handleSelectChangeMetrics,
    handleResetMetrics,
    defaultMetricsWithAllSelected,
    periodicSelectionFilter,
    handlePeriodChange,
    selectMetrics,
    trailingAddress,
    summaryTotalTable,
    headerValuesTable,
    isLoading,
  };
};
