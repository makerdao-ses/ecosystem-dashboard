import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sortEnum';
import type { ActivityTableHeader } from '../../components/CUActivityTable/ActivityTable';

export const useCuActivity = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const code = router.query.code as string;
  const ref = useRef<HTMLDivElement>(null);
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
    code,
    ref,
  };
};
