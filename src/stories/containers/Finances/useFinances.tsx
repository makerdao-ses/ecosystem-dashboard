import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/light';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import EndgameScopeBudgets from './components/EndgameScopeBudgets';
import MakerDAOLegacyBudgets from './components/MakerDAOLegacyBudgets';
import { getExpenseMonthWithData, mockDataApiTeam } from './utils/utils';
import type {
  DelegateExpenseTableHeader,
  FilterDoughnut,
  NavigationCard,
  PeriodicSelectionFilter,
} from './utils/types';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';

import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';
import type { MomentDataItem } from '@ses/core/models/interfaces/team';

export const useFinances = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const getExpenseReportItems: MomentDataItem[] = useMemo(() => mockDataApiTeam, []);
  const routes = ['Finances'];
  const years = ['2022', '2023'];
  const metricsFilter = useMemo(
    () => ['Budget', 'Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain'],
    []
  );
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
  ]);

  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChangeMetrics = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetMetrics = () => {
    setActiveElements([]);
  };
  const periodicSelectionFilter: PeriodicSelectionFilter[] = ['Monthly', 'Quarterly', 'Annually'];
  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];

  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');
  const [periodFilter, setPeriodFilter] = useState<PeriodicSelectionFilter>('Quarterly');
  const router = useRouter();

  const [year, setYears] = useState(years[0]);
  const [isOpenYear, setIsOpenYear] = useState<boolean>(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState<boolean>(false);
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

  const headersExpenseReport: DelegateExpenseTableHeader[] = [
    {
      header: 'Contributors',
      styles: {
        boxSizing: 'border-box',
        minWidth: 228,
        paddingLeft: 16,
      },
      sortReverse: true,
      sort: headersSort[0],
    },
    {
      header: 'Reporting Month',
      styles: {
        width: 170,
        marginLeft: 112,

        [lightTheme.breakpoints.up('desktop_1280')]: {
          marginLeft: 122,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 126,
        },
      },
      sortReverse: true,
      sort: headersSort[1],
    },
    {
      header: 'Total Actuals',
      sort: headersSort[2],
      styles: {
        width: 170,
        marginLeft: -18,

        [lightTheme.breakpoints.up('desktop_1280')]: {
          marginLeft: -4,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 12,
          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
    {
      header: 'Status',
      sort: headersSort[3],
      styles: {
        width: 173,
        marginLeft: -6,

        [lightTheme.breakpoints.up('desktop_1280')]: {
          // marginLeft: 18,
          marginLeft: 2,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 12,
          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
    {
      header: 'Last Modified',
      sort: headersSort[4],
      styles: {
        width: 173,
        marginLeft: 10,

        [lightTheme.breakpoints.up('desktop_1280')]: {
          marginLeft: 22,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 92,
          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
  ];
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
    const resultMoment = orderBy(getExpenseReportItems, 'name');

    return resultMoment;
  }, [getExpenseReportItems]);
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
      svgImage: <EndgameAtlasBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'Endgame Atlas Budgets',
      description: 'Finances of the core governance constructs described in the Maker Atlas.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: '#F99374',
    },
    {
      svgImage: <EndgameScopeBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'Endgame Scope Budgets',
      description: 'Detailed budgets of the practical DAO activities within Endgame.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: '#447AFB',
    },
    {
      svgImage: <MakerDAOLegacyBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'MakerDAO Legacy Budgets',
      description: 'Historical records of MakerDAO expenses, prior to Endgame',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: '#2DC1B1',
    },
  ];
  const handleLinkToPage = (href: string) => {
    // Add the correct link when APi is ready
    console.log('some links', href);
  };
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
    activeElements,
    handleSelectChangeMetrics,
    selectMetrics,
    handleResetMetrics,
    headersExpenseReport,
    onSortClick,
    reportExpenseItems,
    handleLinkToPage,
  };
};
