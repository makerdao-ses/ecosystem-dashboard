import { useMediaQuery } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import request from 'graphql-request';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
import { getExpenseReportsQuery, getExpenseReportsStatusesQuery } from '@/views/Finances/api/queries';
import { getHeadersExpenseReport } from '@/views/Finances/utils/utils';
import { FilterChip } from './ExpenseReportsFilters';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const useExpenseReports = (budgetPath: string) => {
  // metric filter:
  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Actuals');
  const onMetricChange = (value: AnalyticMetric) => setSelectedMetric(value);

  // status filter
  const [selectedStatuses, setSelectedStatuses] = useState<BudgetStatus[]>([]);
  const onStatusSelectChange = (statuses: BudgetStatus[]) => setSelectedStatuses(statuses);

  const handleResetFilter = () => {
    setSelectedMetric('Actuals');
    setSelectedStatuses([]);
  };

  // column sorting
  const [sortColumn, setSortColumn] = useState<number>(4);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Disabled,
    SortEnum.Neutral,
    SortEnum.Disabled,
    SortEnum.Disabled,
    SortEnum.Desc,
  ]);

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

      return getExpenseReportsQuery({
        page: pageIndex + 1,
        budgetPath,
        status:
          selectedStatuses.length > 0
            ? selectedStatuses
            : [BudgetStatus.Draft, BudgetStatus.Review, BudgetStatus.Final, BudgetStatus.Escalated],
        sortByMonth:
          sortColumn === 1
            ? headersSort[1] === SortEnum.Asc
              ? 'asc'
              : headersSort[1] === SortEnum.Desc
              ? 'desc'
              : null
            : null,
        sortByLastModified:
          sortColumn === 4
            ? headersSort[4] === SortEnum.Asc
              ? 'asc'
              : headersSort[4] === SortEnum.Desc
              ? 'desc'
              : null
            : null,
      });
    },
    async (args) => {
      const res = await request<{
        budgetStatements: BudgetStatement[];
      }>(GRAPHQL_ENDPOINT, args.query, args.options);

      return res.budgetStatements;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateAll: false,
      revalidateFirstPage: false,
    }
  );

  const hasExpenseReports = expenseReportResponse.isLoading
    ? true
    : (expenseReportResponse.data ?? []).map((page) => page.length).reduce((acc, curr) => acc + curr, 0) > 0;

  const statusesResponse = useSWRImmutable(['statuses', budgetPath], async () =>
    getExpenseReportsStatusesQuery(budgetPath)
  );

  // status items used in the status multiselect filter
  const statusesItems = useMemo(() => {
    const responseData = statusesResponse.data ? statusesResponse.data : [];

    return responseData.reduce(
      (acc, curr) => {
        if (curr.status === BudgetStatus.Draft) {
          acc[0].count += 1;
        } else if (curr.status === BudgetStatus.Review) {
          acc[1].count += 1;
        } else if (curr.status === BudgetStatus.Final) {
          acc[2].count += 1;
        } else if (curr.status === BudgetStatus.Escalated) {
          acc[3].count += 1;
        }

        return acc;
      },
      [
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
      ]
    );
  }, [statusesResponse.data]);

  const isDisabled = selectedMetric === 'Actuals' && selectedStatuses.length === 0;

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
    hasExpenseReports,
    isDisabled,
  };
};
