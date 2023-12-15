import { useMediaQuery } from '@mui/material';
import {
  getExpenseMonthWithData,
  getHeadersExpenseReport,
  getStatus,
  mockDataApiTeam,
} from '@ses/containers/Finances/utils/utils';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/light';
import orderBy from 'lodash/orderBy';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { FilterChip } from './ExpenseReportsFilters';
import type { MomentDataItem } from '@ses/containers/Finances/utils/types';

export const useDelegateExpenseTrendFinances = () => {
  // metric filter:
  const [selectedMetric, setSelectedMetric] = useState<string>('Actuals');
  const onMetricChange = (value: string) => setSelectedMetric(value);

  // status filter
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const onStatusSelectChange = (statuses: string[]) => setSelectedStatuses(statuses);

  const handleResetFilter = () => {
    setSelectedMetric('Actuals');
    setSelectedStatuses([]);
  };

  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const handleLoadMore = () => {
    setShowAllItems((prev) => !prev);
  };

  // column sorting
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
  ]);
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

  const isSmallDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  // headers used for the UI table
  const headersExpenseReport = getHeadersExpenseReport(headersSort, selectedMetric, isSmallDesk);

  // actual items fetched from the API
  const expenseReportItems: MomentDataItem[] = useMemo(() => mockDataApiTeam, []);
  const items = !showAllItems ? expenseReportItems.slice(0, 10) : expenseReportItems;
  const groupByStatusDefaultSorting: MomentDataItem[] = useMemo(() => {
    const resultMoment = orderBy(items, 'name');

    return resultMoment;
  }, [items]);

  // final items rendered on the UI
  const reportExpenseItems: MomentDataItem[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: MomentDataItem) => ({
      ...x,
      value: x,
      key: x.code,
    }));
  }, [groupByStatusDefaultSorting, sortData]);

  // status items used in the status multiselect filter
  const statusesItems = useMemo(
    () => [
      {
        id: BudgetStatus.Draft,
        content: <FilterChip status={BudgetStatus.Draft} />,
        count: reportExpenseItems.filter((element) => getStatus(element.budgetStatements) === BudgetStatus.Draft)
          .length,
      },
      {
        id: BudgetStatus.Review,
        content: <FilterChip status={BudgetStatus.Review} />,
        count: reportExpenseItems.filter((element) => getStatus(element.budgetStatements) === BudgetStatus.Review)
          .length,
      },
      {
        id: BudgetStatus.Final,
        content: <FilterChip status={BudgetStatus.Final} />,
        count: reportExpenseItems.filter((element) => getStatus(element.budgetStatements) === BudgetStatus.Final)
          .length,
      },
      {
        id: BudgetStatus.Escalated,
        content: <FilterChip status={BudgetStatus.Escalated} />,
        count: reportExpenseItems.filter((element) => getStatus(element.budgetStatements) === BudgetStatus.Escalated)
          .length,
      },
    ],
    [reportExpenseItems]
  );

  return {
    selectedMetric,
    onMetricChange,
    selectedStatuses,
    onStatusSelectChange,
    statusesItems,
    handleResetFilter,
    headersExpenseReport,
    onSortClick,
    reportExpenseItems,
    expenseItemsCount: expenseReportItems.length,
    showAllItems,
    handleLoadMore,
  };
};
