import { SortEnum } from '@ses/core/enums/sort.enum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/light';
import ActivityTable from './ActivityTable';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Activity Feed/Activity Table',
  component: ActivityTable,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  argTypes: {},
} as ComponentMeta<typeof ActivityTable>;

const globalActivityTableArgs = {
  activityFeed: [
    {
      activityFeed: {
        id: 1,
        created_at: '2022-09-20T12:23:00Z',
        description:
          'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
        params: {
          coreUnit: {
            code: 'SES-001',
            shortCode: 'SES',
          },
          month: '2023-01',
        },
      },
      coreUnit: {
        name: 'Sustainable Ecosystem Scaling',
        shortCode: 'SES',
        image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
      },
    },
    {
      activityFeed: {
        id: 1,
        created_at: '2022-09-19T12:23:00Z',
        description:
          'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
        params: {
          coreUnit: {
            code: 'SES-001',
            shortCode: 'SES',
          },
          month: '2023-01',
        },
      },
      coreUnit: {
        name: 'Collateral Engineering Services',
        shortCode: 'CES',
        image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ces-001/ces_logo.png',
      },
    },
  ],
  columns: [
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
  ],
  shortCode: 'SES',
  isGlobal: true,
};
const args = [
  globalActivityTableArgs,
  {
    ...globalActivityTableArgs,
    activityFeed: globalActivityTableArgs.activityFeed.map((activity) => ({
      ...activity,
      coreUnit: null,
    })),
    columns: [
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
    ],
    isGlobal: false,
  },
];
export const [[ActivityTableLightMode, ActivityTableDarkMode], [CUActivityTableLightMode, CUActivityTableDarkMode]] =
  createThemeModeVariants(ActivityTable, args);
