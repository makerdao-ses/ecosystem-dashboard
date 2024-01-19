import { useMediaQuery } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { getExpenseReportsQuery } from '@ses/containers/Finances/api/queries';
import { getHeadersExpenseReport } from '@ses/containers/Finances/utils/utils';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/light';
import request from 'graphql-request';
import { useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { FilterChip } from './ExpenseReportsFilters';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const useDelegateExpenseTrendFinances = () => {
  // metric filter:
  const [selectedMetric, setSelectedMetric] = useState<string>('Actuals');
  const onMetricChange = (value: string) => setSelectedMetric(value);

  // status filter
  const [selectedStatuses, setSelectedStatuses] = useState<BudgetStatus[]>([]);
  const onStatusSelectChange = (statuses: BudgetStatus[]) => setSelectedStatuses(statuses);

  const handleResetFilter = () => {
    setSelectedMetric('Actuals');
    setSelectedStatuses([]);
  };

  // column sorting
  // todo: sort column should be used when sorting is implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Disabled,
    SortEnum.Neutral,
    SortEnum.Disabled,
    SortEnum.Disabled,
    SortEnum.Neutral,
  ]);

  // todo: instead of this function, we should have a status to change it and and fetch the data sorted from the API
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
  // column headers used for the UI table
  const headersExpenseReport = getHeadersExpenseReport(headersSort, selectedMetric, isSmallDesk);

  // fetch the data paginated
  const expenseReportResponse = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // reached the end

      return getExpenseReportsQuery(pageIndex + 1);
    },
    async (args) => {
      const res = await request<{
        budgetStatements: BudgetStatement[];
      }>(GRAPHQL_ENDPOINT, args.query, args.options);

      return res.budgetStatements;
    }
  );

  // status items used in the status multiselect filter
  const statusesItems = useMemo(
    () => [
      {
        id: BudgetStatus.Draft,
        content: <FilterChip status={BudgetStatus.Draft} />,
        count: 0,
      },
      {
        id: BudgetStatus.Review,
        content: <FilterChip status={BudgetStatus.Review} />,
        count: 0,
      },
      {
        id: BudgetStatus.Final,
        content: <FilterChip status={BudgetStatus.Final} />,
        count: 0,
      },
      {
        id: BudgetStatus.Escalated,
        content: <FilterChip status={BudgetStatus.Escalated} />,
        count: 0,
      },
    ],
    []
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
    expenseReportResponse,
  };
};
