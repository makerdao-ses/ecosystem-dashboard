import { getCorrectCodeFromActivity } from '@ses/components/CUActivityTable/utils/helpers';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useRef, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { SortEnum } from '../../../core/enums/sortEnum';
import type { Activity, ActivityTableHeader } from '../../components/CUActivityTable/ActivityTable';
import type { MultiSelectItem } from '../../components/CustomMultiSelect/CustomMultiSelect';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

export const useGlobalActivity = (coreUnits: CoreUnit[], activityFeed: ChangeTrackingEvent[]) => {
  const [searchText, setSearchText] = useState('');
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const toggleFiltersVisible = () => setFiltersVisible(!filtersVisible);

  const columns: ActivityTableHeader[] = [
    {
      header: 'Team',
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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const coreUnitsMap = useMemo(() => {
    const map = new Map<string, CoreUnit>();
    coreUnits.forEach((cu) => map.set(cu.shortCode, cu));
    return map;
  }, [coreUnits]);

  const extendedActivityFeed = useMemo(
    () =>
      sortBy(
        activityFeed
          .map(
            (activity) =>
              ({
                activityFeed: activity,
                coreUnit: coreUnitsMap.get(getCorrectCodeFromActivity(activity).shortCode ?? ''),
              } as Activity)
          )
          .filter(
            (activity) =>
              (!activeElements.length || activeElements.includes(activity.coreUnit?.shortCode || '')) &&
              (!searchText || activity.activityFeed.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
          ),
        // sort by:
        (activity) => DateTime.fromISO(activity.activityFeed.created_at)
      ),
    [activeElements, activityFeed, coreUnitsMap, searchText]
  );

  return {
    columns,
    extendedActivityFeed,
    searchText,
    setSearchText,
    handleClearSearch,
    filtersActive,
    clearFilters,
    inputRef,
    selectElements,
    activeElements,
    handleSelectChange,
    filtersVisible,
    toggleFiltersVisible,
  };
};
