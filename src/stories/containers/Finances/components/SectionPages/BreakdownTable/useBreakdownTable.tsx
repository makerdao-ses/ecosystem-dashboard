import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { getMetricByPeriod, nameChanged } from '@ses/containers/Finances/utils/utils';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { convertFilterToGranularity, removePatternAfterSlash } from './utils';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type {
  ItemRow,
  MetricValues,
  PeriodicSelectionFilter,
  TableFinances,
} from '@ses/containers/Finances/utils/types';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface TableData {
  [key: string]: Record<string, MetricValues>;
}

const EMPTY_METRIC_VALUE = {
  Actuals: 0,
  Budget: 0,
  PaymentsOnChain: 0,
  Forecast: 0,
  ProtocolNetOutflow: 0,
} as MetricValues;

const METRIC_FILTER_OPTIONS = ['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-chain', 'Actuals'];

export const useBreakdownTable = (year: string, budgets: Budget[], allBudgets: Budget[]) => {
  const router = useRouter();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesk1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const isDesk1920 = useMediaQuery(lightTheme.breakpoints.up('desktop_1920'));
  const [periodFilter, setPeriodFilter] = useState<PeriodicSelectionFilter>(() => {
    const urlPeriod = router.query.period as PeriodicSelectionFilter;
    if (urlPeriod && ['Annually', 'Semi-annual', 'Quarterly', 'Monthly'].includes(urlPeriod)) {
      return urlPeriod;
    }

    return 'Quarterly';
  });

  const maxAmountOfActiveMetrics = useMemo(
    () => getMetricByPeriod(periodFilter, isMobile, isTable, isDesk1024, isDesk1280, isDesk1440, isDesk1920),
    [isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, periodFilter]
  );
  const [activeMetrics, setActiveMetrics] = useState<string[]>(() => {
    let urlMetrics = router.query.metric as string[] | undefined;
    urlMetrics = Array.isArray(urlMetrics) ? urlMetrics : urlMetrics ? [urlMetrics] : undefined;
    if (urlMetrics && urlMetrics.every((metric) => METRIC_FILTER_OPTIONS.includes(metric))) {
      // add extra validation here!
      return urlMetrics;
    }

    // no select any metric, this is delegate to a side effect
    return [];
  });
  const defaultMetricsWithAllSelected = METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics);
  const periodSelectOptions = isMobile
    ? ['Annually', 'Semi-annual']
    : isTable || isDesk1024 || isDesk1280
    ? ['Annually', 'Quarterly']
    : ['Annually', 'Quarterly', 'Monthly'];

  // function to add the period and metrics to the URL as search params
  const updateUrl = useCallback(
    (granularity: PeriodicSelectionFilter, metrics: string[]) => {
      router
        .replace(
          {
            query: {
              path: router.query.path,
              year,
              metric: metrics,
              period: granularity,
            },
            hash: 'breakdown-table',
          },
          undefined,
          {
            shallow: true,
          }
        )
        .catch((error) => {
          if (!error.cancelled) {
            throw error;
          }
        });
    },
    [router, year]
  );

  const selectedGranularity = convertFilterToGranularity(periodFilter);

  // fetch data from the API
  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const lod = 3 + codePath.split('/').length - 1;

  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, codePath, lod], async () =>
    fetchAnalytics(selectedGranularity, year, codePath, lod)
  );

  // create the required data for the table
  const [tableHeader, tableBody] = useMemo(() => {
    // occurred an error or the data is loading
    if (error || !analytics) {
      return [null, null];
    }

    const data = {} as TableData;
    const columnsCount =
      selectedGranularity === 'annual'
        ? 1
        : selectedGranularity === 'semiAnnual'
        ? 3
        : selectedGranularity === 'quarterly'
        ? 5
        : 13;
    // group data in an easier structure to manage
    analytics.series.forEach((series) => {
      series.rows.forEach((row) => {
        const path = row.dimensions[0].path;
        if (!data[path]) {
          // create the path as it does not exist
          data[path] = {};
        }
        if (!data[path][series.period]) {
          // create the period as it does not exist
          data[path][series.period] = { ...EMPTY_METRIC_VALUE };
        }

        // add the metric value to the period
        data[path][series.period][row.metric] += row.value;
      });
    });

    // create a table for each budget for the current level
    const tables = [] as TableFinances[];
    // a sub-table should be created for each budget available in the current level
    budgets.forEach((budget) => {
      const table = {
        tableName: budget.name,
        rows: [],
      } as TableFinances;
      // sub-table rows
      const rows = Object.keys(data)
        .filter((path) => path.startsWith(budget.codePath))
        .map((path) => {
          const columns = Object.values(data[path]);

          if (selectedGranularity !== 'annual') {
            // annual does not have totals
            const total = columns.reduce(
              (acc, current) => {
                acc.Actuals += current.Actuals;
                acc.Budget += current.Budget;
                acc.PaymentsOnChain += current.PaymentsOnChain;
                acc.Forecast += current.Forecast;
                acc.ProtocolNetOutflow += current.ProtocolNetOutflow;
                return acc;
              },
              { ...EMPTY_METRIC_VALUE }
            );

            columns.push(total);
          }

          return {
            name: path,
            codePath: path,
            columns,
          } as ItemRow;
        });

      // complete sub-table rows with missing sub-budgets
      // Note that will be some budgets that don't have subBudget
      const subBudgets = allBudgets.filter((item) => item.parentId === budget.id);
      subBudgets.forEach((subBudget) => {
        if (!rows.some((row) => row.name === subBudget.codePath)) {
          rows.push({
            name: subBudget.codePath,
            codePath: subBudget.codePath,
            columns: Array.from({ length: columnsCount }, () => ({ ...EMPTY_METRIC_VALUE })),
          });
        }
      });

      // add correct rows name
      rows.forEach((row) => {
        row.name =
          subBudgets.filter((item) => item.codePath === row.name)[0]?.name ?? `${removePatternAfterSlash(row.name)}`;
      });

      // sub-table header
      const header: ItemRow = {
        name: nameChanged(budget.name),
        isMain: true,
        codePath: budget.codePath,
        columns: rows
          .reduce((acc, current) => {
            current.columns.forEach((row, index) => {
              if (!acc[index]) {
                acc[index] = { ...EMPTY_METRIC_VALUE };
              }

              acc[index].Actuals += row.Actuals;
              acc[index].Budget += row.Budget;
              acc[index].PaymentsOnChain += row.PaymentsOnChain;
              acc[index].Forecast += row.Forecast;
              acc[index].ProtocolNetOutflow += row.ProtocolNetOutflow;
            });

            return acc;
          }, Array(rows?.[0]?.columns?.length).fill(null))
          .filter((item) => item !== null),
      };
      table.rows = [header, ...rows];

      tables.push(table);
    });

    // now we create the main table header
    // it is guaranteed below that all the sub-tables have a header
    const subTableHeaders = tables.map((table) => table.rows.filter((column) => column.isMain)[0].columns);

    const tableHeader = subTableHeaders.reduce((acc, current) => {
      for (let i = 0; i < acc.length; i++) {
        acc[i].Actuals += current[i]?.Actuals ?? 0;
        acc[i].Budget += current[i]?.Budget ?? 0;
        acc[i].PaymentsOnChain += current[i]?.PaymentsOnChain ?? 0;
        acc[i].Forecast += current[i]?.Forecast ?? 0;
        acc[i].ProtocolNetOutflow += current[i]?.ProtocolNetOutflow ?? 0;
      }
      return acc;
    }, Array.from({ length: columnsCount }, () => ({ ...EMPTY_METRIC_VALUE })) as MetricValues[]);

    return [tableHeader, tables];
  }, [allBudgets, analytics, budgets, error, selectedGranularity]);

  const isLoading = !analytics && !error && (tableHeader === null || tableBody === null);

  // Avoid select all items when is mobile and different annually filter
  const allowSelectAll = !!(periodFilter === 'Annually' && !isMobile);
  const popupContainerHeight = allowSelectAll ? 250 : 210;

  // change the period to the default value if the current period is not allowed for current resolution
  useEffect(() => {
    if (isMobile && periodFilter !== 'Annually' && periodFilter !== 'Semi-annual') {
      // set default for mobile
      setPeriodFilter('Semi-annual');
      updateUrl('Semi-annual', activeMetrics);
    } else if ((isTable || isDesk1024 || isDesk1280) && periodFilter !== 'Annually' && periodFilter !== 'Quarterly') {
      // set default for small desktop
      setPeriodFilter('Quarterly');
      updateUrl('Quarterly', activeMetrics);
    } else if (
      (isDesk1440 || isDesk1920) &&
      periodFilter !== 'Annually' &&
      periodFilter !== 'Quarterly' &&
      periodFilter !== 'Monthly'
    ) {
      // set default for big desktop
      setPeriodFilter('Quarterly');
      updateUrl('Quarterly', activeMetrics);
    }
  }, [activeMetrics, isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, periodFilter, updateUrl]);

  // Default metric per dimension
  useEffect(() => {
    if (maxAmountOfActiveMetrics === 0) {
      // minimum is 1, so if it is 0 it means that it not initialized yet
      return;
    }
    switch (periodFilter) {
      case 'Quarterly':
        if (!isMobile && (activeMetrics.length > maxAmountOfActiveMetrics || activeMetrics.length === 0)) {
          setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
          if (activeMetrics.length !== 0) {
            updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
          }
        }
        break;
      default:
        if (activeMetrics.length > maxAmountOfActiveMetrics || activeMetrics.length === 0) {
          setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
          updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
        }
    }
  }, [
    activeMetrics.length,
    isDesk1024,
    isDesk1280,
    isDesk1440,
    isDesk1920,
    isMobile,
    isTable,
    periodFilter,
    maxAmountOfActiveMetrics,
    updateUrl,
  ]);

  // handlers to change the period and metrics or reset those values to the default ones
  const handleSelectChangeMetrics = (value: string[]) => {
    setActiveMetrics(value);
    updateUrl(periodFilter, value);
  };
  const handleResetMetrics = () => {
    if (isMobile) {
      setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
      setPeriodFilter('Semi-annual');
    }
    if (isTable) {
      setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
      setPeriodFilter('Quarterly');
    }
    if (isDesk1024 || isDesk1280 || isDesk1440) {
      setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
      setPeriodFilter('Quarterly');
    }

    if (isDesk1920) {
      setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
      setPeriodFilter('Quarterly');
    }
    updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
  };
  const handlePeriodChange = (value: string) => {
    setPeriodFilter(value as PeriodicSelectionFilter);
    updateUrl(value as PeriodicSelectionFilter, activeMetrics);
  };

  const selectMetrics = useMemo(
    () =>
      METRIC_FILTER_OPTIONS.map((filter) => ({
        id: filter,
        content: filter,
      })) as MultiSelectItem[],
    []
  );

  const metricsMatch =
    JSON.stringify(activeMetrics) === JSON.stringify(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));

  const isDisabled =
    (isMobile && selectedGranularity === 'semiAnnual' && metricsMatch) ||
    ((isTable || isDesk1024 || isDesk1280 || isDesk1920) && selectedGranularity === 'quarterly' && metricsMatch);

  return {
    isMobile,
    periodFilter,
    activeMetrics,
    maxItems: maxAmountOfActiveMetrics,
    minItems: 1,
    allowSelectAll,
    popupContainerHeight,
    handleSelectChangeMetrics,
    handleResetMetrics,
    defaultMetricsWithAllSelected,
    periodSelectOptions,
    handlePeriodChange,
    selectMetrics,
    tableHeader,
    tableBody,
    isLoading,
    isDisabled,
  };
};
