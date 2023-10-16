import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/light';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import EndgameScopeBudgets from './components/EndgameScopeBudgets';
import MakerDAOLegacyBudgets from './components/MakerDAOLegacyBudgets';
import { getExpenseMonthWithData, getHeadersExpenseReport, getMetricByPeriod, mockDataApiTeam } from './utils/utils';
import type {
  FilterDoughnut,
  MomentDataItem,
  DoughnutSeries,
  MetricsWithAmount,
  PeriodicSelectionFilter,
  NavigationCard,
  Metric,
} from './utils/types';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
const years = ['2022', '2023'];
export const useFinances = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();

  const [showSome, setShowSome] = useState(true);
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

  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');

  const [year, setYears] = useState(years[0]);

  const [isOpenYear, setIsOpenYear] = useState<boolean>(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
  ]);

  const isSmallDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const getExpenseReportItems: MomentDataItem[] = useMemo(() => mockDataApiTeam, []);
  const getItems = showSome ? getExpenseReportItems.slice(0, 10) : getExpenseReportItems;

  const routes = ['Finances'];

  const totalCardsNavigation = 34223;
  const headersExpenseReport = getHeadersExpenseReport(headersSort, isSmallDesk);

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

  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];

  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };

  const handleChangeYears = (event: SelectChangeEvent<unknown>) => {
    setYears(event.target.value as string);
  };
  const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
    setPeriodFilter(event.target.value as PeriodicSelectionFilter);
  };
  const handleOpenYear = () => {
    setIsOpenYear(true);
  };
  const handleCloseYear = () => {
    setIsOpenYear(false);
  };
  const handleOpenPeriod = () => {
    setIsOpenPeriod(true);
  };
  const handleClosePeriod = () => {
    setIsOpenPeriod(false);
  };

  const sortData = useMemo(() => {
    const sortDataFunction = (items: MomentDataItem[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;

      const name = (a: MomentDataItem, b: MomentDataItem) => a.name.localeCompare(b.name) * multiplier;
      const month = (a: MomentDataItem, b: MomentDataItem) =>
        (a.reportMonth.toMillis() - b.reportMonth.toMillis()) * multiplier;
      const total = (a: MomentDataItem, b: MomentDataItem) => (a.totalActuals - b.totalActuals) * multiplier;

      const status = (a: MomentDataItem, b: MomentDataItem): number => {
        const statusA = a.budgetStatements[a.budgetStatements.length - 1]?.status || '';
        const statusB = b.budgetStatements[b.budgetStatements.length - 1]?.status || '';
        return statusA.localeCompare(statusB) * multiplier;
      };

      const lastModified = (a: MomentDataItem, b: MomentDataItem) => {
        const lastModifiedA = getExpenseMonthWithData(a)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis();
        const lastModifiedB = getExpenseMonthWithData(b)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis();
        return (lastModifiedA - lastModifiedB) * multiplier;
      };

      const sortAlg = [name, month, total, status, lastModified, () => 0];
      return [...items].sort(sortAlg[sortColumn]);
    };
    return sortDataFunction;
  }, [headersSort, sortColumn]);

  const groupByStatusDefaultSorting: MomentDataItem[] = useMemo(() => {
    const resultMoment = orderBy(getItems, 'name');

    return resultMoment;
  }, [getItems]);
  const reportExpenseItems: MomentDataItem[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: MomentDataItem) => ({
      ...x,
      value: x,
      key: x.code,
    }));
  }, [groupByStatusDefaultSorting, sortData]);

  const onSortClick = (index: number) => {
    const sortNeutralState = headersExpenseReport.map((header) =>
      header.sort ? SortEnum.Neutral : SortEnum.Disabled
    ) as SortEnum[];

    if (headersSort[index] === SortEnum.Neutral) {
      if (headersExpenseReport[index].sortReverse) {
        sortNeutralState[index] = SortEnum.Desc;
      } else {
        sortNeutralState[index] = SortEnum.Asc;
      }
    } else {
      sortNeutralState[index] = headersSort[index] === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
    }

    setHeadersSort(sortNeutralState);
    setSortColumn(index);
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
  const doughnutSeriesData: DoughnutSeries[] = [
    {
      name: 'Endgame Atlas Budgets',
      value: 4345,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#F99374',
    },
    {
      name: 'Endgame Scope Budgets',
      value: 34627,
      percent: 40,
      actuals: 45,
      budgetCap: 34,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 3445,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#2DC1B1',
    },
  ];

  const cardsNavigationInformation: NavigationCard[] = [
    {
      svgImage: (
        <EndgameAtlasBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'Endgame Atlas Budgets',
      description: 'Finances of the core governance constructs described in the Maker Atlas.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: isLight ? '#F99374' : '#F77249',
    },
    {
      svgImage: (
        <EndgameScopeBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'Endgame Scope Budgets',
      description: 'Detailed budgets of the practical DAO activities within Endgame.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: '#447AFB',
    },
    {
      svgImage: (
        <MakerDAOLegacyBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'MakerDAO Legacy Budgets',
      description: 'Historical records of MakerDAO expenses, prior to Endgame',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: isLight ? '#2DC1B1' : '#1AAB9B',
    },
  ];
  const handleLoadMore = () => {
    setShowSome(!showSome);
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
    years,
    year,
    isOpenYear,
    handleChangeYears,
    handleOpenYear,
    handleCloseYear,
    router,
    trailingAddress,
    filterSelected,
    filters,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
    isLight,
    doughnutSeriesData,
    cardsNavigationInformation,
    periodicSelectionFilter,
    handlePeriodChange,
    handleClosePeriod,
    handleOpenPeriod,
    periodFilter,
    isOpenPeriod,
    activeMetrics,
    handleSelectChangeMetrics,
    selectMetrics,
    handleResetMetrics,
    headersExpenseReport,
    onSortClick,
    reportExpenseItems,
    showSome,
    handleLoadMore,
    getItems,
    handleResetFilters,
    totalCardsNavigation,
    allowSelectAll,
    mapMetricValuesTotal,
    getAllMetricsValuesTotal,
    defaultMetricsWithAllSelected,
    maxItems,
    minItems,
    popupContainerHeight,
  };
};
