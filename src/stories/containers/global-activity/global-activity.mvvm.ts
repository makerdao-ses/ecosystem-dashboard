import sortBy from 'lodash/sortBy';
import { useMemo, useRef, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { SortEnum } from '../../../core/enums/sort.enum';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import type { Activity, ActivityTableHeader } from '../../components/CUActivityTable/ActivityTable';
import type { MultiSelectItem } from '../../components/custom-multi-select/custom-multi-select';

export const useGlobalActivityMvvm = (coreUnits: CoreUnitDto[]) => {
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

  const activityFeed = useMemo(
    () =>
      sortBy(
        coreUnits
          .filter((cu) => !activeElements.length || activeElements.includes(cu.shortCode))
          .reduce(
            (acc, cu) => [
              ...acc,
              ...cu.activityFeed
                .filter((af) => !searchText || af.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
                .map((act) => ({
                  coreUnit: cu,
                  activityFeed: act,
                })),
            ],
            [] as Activity[]
          ),
        'created_at'
      ),
    [activeElements, coreUnits, searchText]
  );

  return {
    columns,
    activityFeed,
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
