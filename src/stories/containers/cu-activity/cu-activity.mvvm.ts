import { useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sort.enum';
import { ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';

export const useCuActivityMvvm = () => {
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

  return {
    isLight,
    columns,
    onSortClick,
  };
};
