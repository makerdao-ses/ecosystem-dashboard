import { fetcher } from '@ses/core/utils/fetcher';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import lightTheme from '../../../../styles/theme/light';
import { SortEnum } from '../../../core/enums/sort.enum';
import { GET_ACTIVITIES } from './global-activity.api';
import type { ActivityFeedDto, CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import type { ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';
import type { MultiSelectItem } from '../../components/custom-multi-select/custom-multi-select';

const PAGE_SIZE = 10;

export const useGlobalActivityMvvm2 = (coreUnits: CoreUnitDto[]) => {
  const [searchText, setSearchText] = useState('');
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const toggleFiltersVisible = () => setFiltersVisible(!filtersVisible);

  const columns: ActivityTableHeader[] = [
    {
      header: 'Core Unit',
      styles: {
        minWidth: 360,
        paddingLeft: 32,
        paddingRight: 14,
        boxSizing: 'border-box',
        [lightTheme.breakpoints.up('desktop_1194')]: {
          minWidth: 387,
          paddingLeft: 64,
        },
      },
      sort: SortEnum.Disabled,
    },
    {
      header: 'Timestamp',
      styles: {
        width: 251,
      },
      sort: SortEnum.Disabled,
    },
    {
      header: 'Details',
      sort: SortEnum.Disabled,
    },
  ];

  const handleClearSearch = () => {
    setSearchText('');
  };

  const clearFilters = () => {
    handleClearSearch();
    setActiveElements([]);
  };

  const filtersActive = !!searchText || !!activeElements.length;

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };

  const selectElements = useMemo(
    () =>
      sortBy(coreUnits, (cu) => cu.name).map((coreUnits) => ({
        id: coreUnits.shortCode,
        content: coreUnits.name,
        params: {
          url: coreUnits.image,
          code: coreUnits.shortCode,
        },
      })) as MultiSelectItem[],
    [coreUnits]
  );

  const { data, error, size, setSize } = useSWRInfinite((index) => {
    // TODO: include filters
    const { query, filter } = GET_ACTIVITIES(index * PAGE_SIZE, PAGE_SIZE);
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
    coreUnit: coreUnits.find((cu) => cu.shortCode === activity.params.coreUnit.shortCode),
  }));

  return {
    columns,
    searchText,
    setSearchText,
    handleClearSearch,
    filtersActive,
    clearFilters,
    selectElements,
    activeElements,
    handleSelectChange,
    filtersVisible,
    toggleFiltersVisible,

    activities: extendedActivities,
    loadMore,
    isLoadingMore,
    hasMoreElements,
  };
};
