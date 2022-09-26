import { useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';

export const useCuActivityMvvm = () => {
  const isLight = useThemeContext().themeMode === 'light';

  const [columns] = useState<ActivityTableHeader[]>([
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
    },
    {
      header: 'Details',
    },
  ]);

  return {
 isLight,
columns
};
};
