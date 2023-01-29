import { fetcher } from '@ses/core/utils/fetcher';
import { useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sort.enum';
import { GET_ACTIVITIES } from '../global-activity/global-activity.api';
import type { ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';
import type { ActivityFeedDto } from '@ses/core/models/dto/core-unit.dto';

const PAGE_SIZE = 10;

export const useCuActivityMvvm2 = (cuId: string) => {
  const { isLight } = useThemeContext();

  const [columns, setColumns] = useState<ActivityTableHeader[]>([
    {
      header: 'Timestamp',
      styles: {
        [lightTheme.breakpoints.up('table_834')]: {
          width: 262,
          paddingLeft: 32,
          paddingRight: 14,
        },
        [lightTheme.breakpoints.up('desktop_1194')]: {
          width: 339,
          paddingLeft: 64,
          paddingRight: 14,
        },
      },
      sort: SortEnum.Desc,
    },
    {
      header: 'Details',
      sort: SortEnum.Disabled,
    },
  ]);

  const onSortClick = (i: number) => {
    const temp = [...columns];
    temp[i].sort = temp[i].sort === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
    setColumns(temp);
  };

  const { data, error, size, setSize } = useSWRInfinite((index) => {
    // TODO: include filters
    const { query, filter } = GET_ACTIVITIES(index * PAGE_SIZE, PAGE_SIZE, cuId);
    return {
      query,
      input: filter,
    };
  }, fetcher);

  const activities = useMemo(
    () => (data ? (data.map((page) => page?.activityFeed || []).flat() as ActivityFeedDto[]) : []),
    [data]
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && !!data && typeof data[size - 1] === 'undefined');
  const hasMoreElements = !(data?.[data.length - 1]?.activityFeed?.length < PAGE_SIZE);
  const loadMore = () => hasMoreElements && setSize(size + 1);

  const extendedActivities = activities.map((activity) => ({
    activityFeed: activity,
  }));

  return {
    isLight,
    columns,
    onSortClick,

    activities: extendedActivities,
    loadMore,
    isLoadingMore,
    hasMoreElements,
  };
};
