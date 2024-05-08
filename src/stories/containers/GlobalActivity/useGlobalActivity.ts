import { getCorrectCodeFromActivity } from '@ses/components/CUActivityTable/utils/helpers';
import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useRef, useState } from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { SortEnum } from '../../../core/enums/sortEnum';
import type { Activity, ActivityTableHeader } from '../../components/CUActivityTable/ActivityTable';
import type { MultiSelectItem } from '../../components/CustomMultiSelect/CustomMultiSelect';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Team } from '@ses/core/models/interfaces/team';

export const useGlobalActivity = (teams: Team[], activityFeed: ChangeTrackingEvent[]) => {
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
      sortBy(teams, (team) => team.name).map((team) => ({
        id: team.shortCode,
        content: team.name,
        params: {
          url: team.image,
          code: team.shortCode,
        },
      })) as MultiSelectItem[],
    [teams]
  );

  const teamMap = useMemo(() => {
    const map = new Map<string, Team>();
    teams.forEach((team) => map.set(team.shortCode, team));
    return map;
  }, [teams]);

  const extendedActivityFeed = useMemo(
    () =>
      sortBy(
        activityFeed
          .map(
            (activity) =>
              ({
                activityFeed: activity,
                team: teamMap.get(getCorrectCodeFromActivity(activity).shortCode ?? ''),
              } as Activity)
          )
          .filter(
            (activity) =>
              (!activeElements.length || activeElements.includes(activity.team?.shortCode || '')) &&
              (!searchText || activity.activityFeed.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
          ),
        // sort by:
        (activity) => DateTime.fromISO(activity.activityFeed.created_at)
      ),
    [activeElements, activityFeed, searchText, teamMap]
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
