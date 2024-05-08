import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { formatBudgetName } from '@ses/containers/Finances/utils/utils';
import lightTheme from '@ses/styles/theme/themes';
import groupBy from 'lodash/groupBy';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { convertFilterToGranularity, isHeaderValuesZero, removePatternAfterSlash } from './utils';
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

const METRIC_FILTER_OPTIONS = ['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-Chain', 'Actuals'];

interface ResolutionsFlags {
  isMobile: boolean;
  isTable: boolean;
  isDesk1024: boolean;
  isDesk1280: boolean;
  isDesk1440: boolean;
  isDesk1920: boolean;
  isDesk2400: boolean;
  isDesk3000: boolean;
}

const maxAllowedSelectedMetrics = (
  periodFilter: PeriodicSelectionFilter,
  resolutions: ResolutionsFlags = {
    isMobile: false,
    isTable: false,
    isDesk1024: false,
    isDesk1280: false,
    isDesk1440: false,
    isDesk1920: false,
    isDesk2400: false,
    isDesk3000: false,
  }
) => {
  let metricsCount = 0;
  // This is for metrics base on the resolution
  if (periodFilter === 'Semi-annual') {
    metricsCount = 1;
  } else if (periodFilter === 'Annually') {
    if (resolutions.isMobile) {
      metricsCount = 3;
    } else {
      metricsCount = 5;
    }
  } else if (periodFilter === 'Monthly' && (resolutions.isDesk1440 || resolutions.isDesk1920)) {
    metricsCount = 1;
  } else if (periodFilter === 'Quarterly') {
    if (resolutions.isTable) metricsCount = 1;
    if (resolutions.isDesk1024 || resolutions.isDesk1280 || resolutions.isDesk1440) metricsCount = 2;
    if (resolutions.isDesk1920 && !resolutions.isDesk2400 && !resolutions.isDesk3000) metricsCount = 3;
    if (resolutions.isDesk2400 && !resolutions.isDesk3000) metricsCount = 4;
    if (resolutions.isDesk3000) metricsCount = 5;
  }

  return metricsCount;
};

export const useBreakdownTable = (year: string, budgets: Budget[], allBudgets: Budget[]) => {
  const router = useRouter();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesk1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const isDesk1920 = useMediaQuery(lightTheme.breakpoints.up('desktop_1920'));
  const isUpDesk2400 = useMediaQuery(lightTheme.breakpoints.up(2400));
  const isUpDesk3000 = useMediaQuery(lightTheme.breakpoints.up(3000));

  const [periodFilter, setPeriodFilter] = useState<PeriodicSelectionFilter>(() => {
    const urlPeriod = router.query.period as PeriodicSelectionFilter;
    if (urlPeriod && ['Annually', 'Semi-annual', 'Quarterly', 'Monthly'].includes(urlPeriod)) {
      return urlPeriod;
    }

    return 'Quarterly';
  });

  // calculate the maximum amount of active metrics based on the resolution
  const maxAmountOfActiveMetrics = useMemo(
    () =>
      maxAllowedSelectedMetrics(periodFilter, {
        isMobile,
        isTable,
        isDesk1024,
        isDesk1280,
        isDesk1440,
        isDesk1920,
        isDesk2400: isUpDesk2400,
        isDesk3000: isUpDesk3000,
      }),
    [isDesk1024, isDesk1280, isDesk1440, isDesk1920, isMobile, isTable, isUpDesk2400, isUpDesk3000, periodFilter]
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
    (granularity: PeriodicSelectionFilter, metrics: string[], avoidance = false) => {
      if (avoidance && !router.asPath.endsWith('#breakdown-table') && !router.query.period && !router.query.metric) {
        return;
      }

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
        let path = row.dimensions[0].path;

        if (path.includes('*')) {
          // it can be an uncategorized budget
          const reducedPath = removePatternAfterSlash(path);
          if (budgets.some((budget) => budget.codePath === reducedPath)) {
            path = reducedPath; // it is not uncategorized
          }
        }

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

    // create a sub-table for each budget that has * in the path
    // this sub-table will be used as the uncategorized table
    let uncategorizedSubTable: TableFinances | null = null;
    Object.keys(data)
      .filter((path) => path.includes('*'))
      .forEach((path, _, array) => {
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

        // this path can not be used for other sub tables
        delete data[path];

        const name = removePatternAfterSlash(path).substring(removePatternAfterSlash(path).lastIndexOf('/') + 1);

        if (uncategorizedSubTable === null) {
          // it is empty so we create it
          const row = {
            name: array.length === 1 ? 'Uncategorized' : name,
            codePath: path,
            isUncategorized: true,
            columns,
          } as ItemRow;
          uncategorizedSubTable = {
            tableName: 'Uncategorized',
            rows:
              array.length === 1
                ? [row]
                : [
                    // the first row is the is the header of the sub-table
                    {
                      ...row,
                      name: 'Uncategorized',
                      isMain: true,
                    },
                    row,
                  ],
          } as TableFinances;
        } else {
          // there's more than one uncategorized budget so we add it to the existing table as a new row
          uncategorizedSubTable.rows.push({
            name,
            codePath: path,
            isUncategorized: true,
            columns,
          } as ItemRow);

          // update the header of the sub-table
          uncategorizedSubTable.rows[0].columns = uncategorizedSubTable.rows[0].columns.map((headerColumn, index) => ({
            Actuals: headerColumn.Actuals + columns[index].Actuals,
            Budget: headerColumn.Budget + columns[index].Budget,
            PaymentsOnChain: headerColumn.PaymentsOnChain + columns[index].PaymentsOnChain,
            Forecast: headerColumn.Forecast + columns[index].Forecast,
            ProtocolNetOutflow: headerColumn.ProtocolNetOutflow + columns[index].ProtocolNetOutflow,
          }));
        }
      });

    // create a table for each budget for the current level
    const tables = uncategorizedSubTable === null ? ([] as TableFinances[]) : [uncategorizedSubTable];
    if (budgets.length === 0) {
      const rows = Object.keys(data).map((path) => {
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
      const subTableHeaders = rows.map((item) => item.columns);
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

      return [tableHeader, []];
    }

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
          if (subBudget.code === 'uncategorized' || subBudget.code === 'other') {
            return; // all the values are 0 so we don't need to add it
          }
          rows.push({
            name: isMobile ? subBudget.code : subBudget.codePath,
            codePath: subBudget.codePath,
            columns: Array.from({ length: columnsCount }, () => ({ ...EMPTY_METRIC_VALUE })),
          });
        }
      });
      // add correct rows name
      rows.forEach((row) => {
        const nameOrCode = subBudgets.filter((item) => item.codePath === row.name)[0];
        if (!nameOrCode) {
          row.name = `${removePatternAfterSlash(row.name)}`;
        } else {
          row.name = isMobile ? nameOrCode.code : nameOrCode.name;
        }
      });

      // sub-table header
      const header: ItemRow = {
        name: isMobile ? (lod === 3 ? formatBudgetName(budget.name) : budget.code) : formatBudgetName(budget.name),

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
      // Check if only one element is only the header so don't need rows
      if (!((header.name === 'Uncategorized' || header.name === 'Other') && isHeaderValuesZero(header))) {
        if (rows.length === 1) {
          table.rows = [header];
        } else {
          // There are its header and rows
          table.rows = [header, ...rows];
        }
      }

      tables.push(table);
    });

    // group the remaining paths that are not in the tables
    const groups = groupBy(
      Object.keys(data)
        // remaining paths that are not in the tables
        .filter((path) => !tables.some((table) => table.rows.some((row) => row.codePath === path))),
      (path) => path.replace(`${codePath}/`, '').split('/')[0]
    );
    // create a sub-table for each group
    Object.keys(groups).forEach((groupKey) => {
      const table = {
        tableName: groupKey,
        rows: [],
      } as TableFinances;

      groups[groupKey].forEach((path) => {
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

        table.rows.push({
          name: path, // TODO: maybe we can get the name from the budget list
          codePath: path,
          columns,
        } as ItemRow);
      });

      const header: ItemRow = {
        name: groupKey,
        isMain: true,
        codePath: groupKey,
        columns: table.rows
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
          }, Array(table.rows?.[0]?.columns?.length).fill(null))
          .filter((item) => item !== null),
      };
      table.rows.unshift(header);

      tables.push(table);
    });

    // now we create the main table header
    // it is guaranteed below that all the sub-tables have a header
    const subTableHeaders = tables.map((table) => {
      const mainRow = table.rows.find((column) => column.isMain || column.isUncategorized);
      return mainRow ? mainRow.columns : [];
    });

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

    // limit sub-tables up to 13 rows maximum
    tables.forEach((table) => {
      if (table.rows.length > 12) {
        const rows = table.rows.slice(0, 12);
        const others = table.rows.slice(12);
        const othersTotal = others.reduce(
          (acc, current) => {
            for (let index = 0; index < current.columns.length; index++) {
              Object.keys(acc.columns[0]).forEach((key) => {
                acc.columns[index][key as keyof MetricValues] += current.columns[index][key as keyof MetricValues];
              });
            }
            return acc;
          },
          {
            name: 'Others',
            isSummaryRow: true,
            columns: table.rows[0].columns.map(() => ({
              Actuals: 0,
              Budget: 0,
              Forecast: 0,
              PaymentsOnChain: 0,
              ProtocolNetOutflow: 0,
            })),
          } as ItemRow
        );

        table.rows = [...rows, othersTotal];
      }
    });

    // sort final tables by the amount of rows
    const sortedTables = tables.sort((a, b) => {
      // uncategorized should be the first
      if (b.rows[0].isUncategorized) return 1;

      return b.rows.length - a.rows.length;
    });
    return [tableHeader, sortedTables];
  }, [allBudgets, analytics, budgets, codePath, error, isMobile, lod, selectedGranularity]);

  const isLoading = !analytics && !error && (tableHeader === null || tableBody === null);

  // Avoid select all items when is mobile and different annually filter
  const allowSelectAll = !!(periodFilter === 'Annually' && !isMobile);
  const popupContainerHeight = allowSelectAll ? 260 : 218;

  // this state is used to avoid adding url params on mobile on the first render
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setIsInitialized(true), 500);
  }, []);

  // change the period to the default value if the current period is not allowed for current resolution
  useEffect(() => {
    if (isMobile && periodFilter !== 'Annually' && periodFilter !== 'Semi-annual') {
      // set default for mobile
      setPeriodFilter('Semi-annual');
      if (isInitialized) updateUrl('Semi-annual', activeMetrics, true);
    } else if ((isTable || isDesk1024 || isDesk1280) && periodFilter !== 'Annually' && periodFilter !== 'Quarterly') {
      // set default for small desktop
      setPeriodFilter('Quarterly');
      updateUrl('Quarterly', activeMetrics, true);
    } else if (
      (isDesk1440 || isDesk1920) &&
      periodFilter !== 'Annually' &&
      periodFilter !== 'Quarterly' &&
      periodFilter !== 'Monthly'
    ) {
      // set default for big desktop
      setPeriodFilter('Quarterly');
      updateUrl('Quarterly', activeMetrics, true);
    }
  }, [
    activeMetrics,
    isDesk1024,
    isDesk1280,
    isDesk1440,
    isDesk1920,
    isMobile,
    isTable,
    isInitialized,
    periodFilter,
    updateUrl,
  ]);

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
          // if there are not metrics it means that the page is initializing
          if (activeMetrics.length !== 0) {
            updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics), true);
          }
        }
        break;
      default:
        if (activeMetrics.length > maxAmountOfActiveMetrics || activeMetrics.length === 0) {
          setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
          if (isInitialized) updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics), true);
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
    isInitialized,
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
    if (isTable || isDesk1024 || isDesk1280 || isDesk1440 || isDesk1920) {
      setActiveMetrics(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
      setPeriodFilter('Quarterly');
    }
    updateUrl(periodFilter, METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics));
  };
  const handlePeriodChange = (value: string) => {
    const metrics = METRIC_FILTER_OPTIONS.slice(
      0,
      maxAllowedSelectedMetrics(value as PeriodicSelectionFilter, {
        isMobile,
        isTable,
        isDesk1024,
        isDesk1280,
        isDesk1440,
        isDesk1920,
        isDesk2400: isUpDesk2400,
        isDesk3000: isUpDesk3000,
      })
    );
    setPeriodFilter(value as PeriodicSelectionFilter);
    setActiveMetrics(metrics);
    updateUrl(value as PeriodicSelectionFilter, metrics);
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
    JSON.stringify(activeMetrics.sort()) ===
    JSON.stringify(METRIC_FILTER_OPTIONS.slice(0, maxAmountOfActiveMetrics).sort());

  const isDisabled =
    metricsMatch && (isMobile ? selectedGranularity === 'semiAnnual' : selectedGranularity === 'quarterly');

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
