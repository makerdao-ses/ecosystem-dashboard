import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { getMetricByPeriod } from '@ses/containers/Finances/utils/utils';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { Metric, MetricsWithAmount, PeriodicSelectionFilter } from '@ses/containers/Finances/utils/types';

export const useBreakdownTable = (initialYear: string) => {
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

  const [year, setYear] = useState(initialYear);

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

  const handleChangeYears = (value: string) => {
    setYear(value);
    router.push(`${siteRoutes.newFinancesOverview}?year=${value}` /* undefined, { shallow: true } */);
  };
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
  const handleResetFilters = () => {
    console.log('reset-filters');
  };
  const mapMetricValuesTotal = useMemo(() => {
    const mapMetricValues: Record<Metric, number> = {
      Budget: 11044445,
      Actual: 11044445,
      Forecast: 11044445,
      'Net Expenses On-chain': 11044445,
      'Net Expenses Off-chain': 11044445,
    };
    return mapMetricValues;
  }, []);
  const getAllMetricsValuesTotal = useCallback(() => {
    const metricValues: MetricsWithAmount[] = [];
    if (periodFilter === 'Quarterly') {
      activeMetrics.forEach((metric: string) => {
        const amount = mapMetricValuesTotal[metric as Metric] || 0;
        if (amount !== undefined) {
          metricValues.push({
            name: metric as Metric,
            amount,
          });
        }
      });
    }
    if (periodFilter === 'Annually' || periodFilter === 'Monthly' || periodFilter === 'Semi-annual') {
      activeMetrics.forEach((metric: string) => {
        metricValues.push({
          name: metric as Metric,
          amount: 11044445,
        });
      });
    }

    return metricValues;
  }, [activeMetrics, mapMetricValuesTotal, periodFilter]);

  return {
    isMobile,
    initialValue,
    periodFilter,
    activeMetrics,
    maxItems,
    minItems,
    allowSelectAll,
    popupContainerHeight,
    year,
    totalCardsNavigation,
    routes,
    handleSelectChangeMetrics,
    handleResetMetrics,
    defaultMetricsWithAllSelected,
    periodicSelectionFilter,
    handleChangeYears,
    handlePeriodChange,
    selectMetrics,
    trailingAddress,
    handleResetFilters,
    mapMetricValuesTotal,
    getAllMetricsValuesTotal,
  };
};
