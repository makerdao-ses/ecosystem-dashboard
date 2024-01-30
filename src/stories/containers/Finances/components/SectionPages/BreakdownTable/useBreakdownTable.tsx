import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { getMetricByPeriod, nameChanged } from '@ses/containers/Finances/utils/utils';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
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

export const useBreakdownTable = (year: string, budgets: Budget[], allBudgets: Budget[]) => {
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
    () => ['Budget', 'Actuals', 'Forecast', 'Net Expenses On-chain', 'Net Protocol Outflow'],
    []
  );
  const val = useMemo(
    () => getMetricByPeriod(periodFilter, isMobile, isTable, isDesk1024, isDesk1280, isDesk1440, isDesk1920),
    [isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, periodFilter]
  );
  const [numberMetrics, setNumberMetrics] = useState(val);
  const [activeMetrics, setActiveMetrics] = useState<string[]>(metricsFilter.slice(0, val));
  const maxItems = val;
  const minItems = 1;

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
        if (numberMetrics !== val) {
          setActiveMetrics(metricsFilter.slice(0, val));
        }
      }
      if (isDesk1024 || isDesk1280 || isDesk1440) {
        if (numberMetrics !== val) {
          setActiveMetrics(metricsFilter.slice(0, val));
        }
      }
      if (isDesk1920) {
        if (numberMetrics !== val) {
          setActiveMetrics(metricsFilter.slice(0, val));
        }
      }
    }
    if (periodFilter === 'Monthly') {
      if (numberMetrics !== val) {
        setActiveMetrics(metricsFilter.slice(0, val));
      }
    }
    if (periodFilter === 'Annually') {
      if (isMobile) {
        if (numberMetrics !== val) {
          setActiveMetrics(metricsFilter.slice(0, val));
        }
      } else {
        if (numberMetrics !== val) {
          setActiveMetrics(metricsFilter.slice(0, val));
        }
      }
    }
    if (periodFilter === 'Semi-annual') {
      setActiveMetrics(metricsFilter.slice(0, val));
    }
  }, [
    activeMetrics.length,
    isDesk1024,
    isDesk1280,
    isDesk1440,
    isDesk1920,
    isMobile,
    isTable,
    metricsFilter,
    numberMetrics,
    periodFilter,
    val,
  ]);

  // Only show monthly filter in dimension bigger than isDesk1440
  useEffect(() => {
    const handleResize = () => {
      setNumberMetrics(val);
      if (periodFilter === 'Monthly' && (isMobile || isDesk1024 || isDesk1280)) {
        setPeriodFilter('Quarterly');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesk1024, isDesk1280, isDesk1440, isMobile, periodFilter, val]);

  const handleSelectChangeMetrics = (value: string[]) => {
    setNumberMetrics(val);
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

  return {
    isMobile,
    initialValue,
    periodFilter,
    activeMetrics,
    maxItems,
    minItems,
    allowSelectAll,
    popupContainerHeight,
    handleSelectChangeMetrics,
    handleResetMetrics,
    defaultMetricsWithAllSelected,
    periodicSelectionFilter,
    handlePeriodChange,
    selectMetrics,
    tableHeader,
    tableBody,
    isLoading,
  };
};
