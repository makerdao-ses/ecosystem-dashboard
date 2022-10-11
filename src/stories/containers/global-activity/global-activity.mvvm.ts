import lightTheme from '../../../../styles/theme/light';
import { SortEnum } from '../../../core/enums/sort.enum';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { Activity, ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';
import sortBy from 'lodash/sortBy';
import { useMemo, useRef, useState } from 'react';
import { MultiSelectItem } from '../../components/custom-multi-select/custom-multi-select';

export const useGlobalActivityMvvm = (coreUnits: CoreUnitDto[]) => {
  const [searchText, setSearchText] = useState('');
  const [activeElements, setActiveElements] = useState<string[]>([]);

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

  const handleCleanSearch = () => {
    setSearchText('');
  };

  const clearFilters = () => {
    handleCleanSearch();
    setActiveElements([]);
  };

  const filtersActive = !!searchText || activeElements.length;

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const selectElements = useMemo(() => {
    return coreUnits.map((coreUnits) => ({
      id: coreUnits.shortCode,
      content: coreUnits.name,
      params: {
        url: coreUnits.image,
        code: coreUnits.shortCode,
      },
    })) as MultiSelectItem[];
  }, [coreUnits]);

  const activityFeed = useMemo(() => {
    return sortBy(
      coreUnits
        .filter((cu) => {
          let condition = true;
          if (activeElements.length) {
            condition = condition && activeElements.includes(cu.shortCode);
          }

          if (searchText) {
            condition =
              condition &&
              cu.activityFeed.some((af) => af.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
          }

          return condition;
        })
        .reduce((acc, cu) => {
          return [
            ...acc,
            ...cu.activityFeed.map((act) => ({
              coreUnit: cu,
              activityFeed: act,
            })),
          ];
        }, [] as Activity[]),
      'created_at'
    );
  }, [activeElements, searchText]);

  return {
    columns,
    activityFeed,
    searchText,
    setSearchText,
    handleCleanSearch,
    filtersActive,
    clearFilters,
    inputRef,
    selectElements,
    activeElements,
    handleSelectChange,
  };
};
