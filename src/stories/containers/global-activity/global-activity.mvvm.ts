import lightTheme from '../../../../styles/theme/light';
import { SortEnum } from '../../../core/enums/sort.enum';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { Activity, ActivityTableHeader } from '../../components/cu-activity-table/cu-activity-table';
import sortBy from 'lodash/sortBy';

export const useGlobalActivityMvvm = (coreUnits: CoreUnitDto[]) => {
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

  const activityFeed = sortBy(
    coreUnits.reduce((acc, cu) => {
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

  return {
    columns,
    activityFeed,
  };
};
