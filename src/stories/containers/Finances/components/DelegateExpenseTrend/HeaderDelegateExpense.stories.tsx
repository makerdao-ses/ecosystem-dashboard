import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/light';
import HeaderDelegateExpense from './HeaderDelegateExpense';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/NewFinances/HeaderDelegateExpense',
  component: HeaderDelegateExpense,
  parameters: {
    chromatic: {
      viewports: [1194, 1280, 1440, 1920],
    },
  },
} as ComponentMeta<typeof HeaderDelegateExpense>;

const variantsArgs = [
  {
    columns: [
      {
        header: 'Contributors',
        styles: {
          boxSizing: 'border-box',
          minWidth: 228,
          paddingLeft: 16,
        },
        sortReverse: true,
      },
      {
        header: 'Reporting Month',
        styles: {
          width: 170,
          marginLeft: 112,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 122,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 126,
          },
        },
        sortReverse: true,
      },
      {
        header: 'Total Actuals',

        styles: {
          width: 170,
          marginLeft: -18,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: -4,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 12,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
      {
        header: 'Status',

        styles: {
          width: 173,
          marginLeft: -6,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 2,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 12,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
      {
        header: 'Last Modified',

        styles: {
          width: 173,
          marginLeft: 10,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 22,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 92,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
    ],
  },
  {
    columns: [
      {
        header: 'Contributors',
        styles: {
          boxSizing: 'border-box',
          minWidth: 228,
          paddingLeft: 16,
        },
        sortReverse: true,
      },
      {
        header: 'Report Month',
        styles: {
          width: 170,
          marginLeft: 112,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 122,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 126,
          },
        },
        sortReverse: true,
      },
      {
        header: 'Total Actuals',

        styles: {
          width: 170,
          marginLeft: -18,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: -4,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 12,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
      {
        header: 'Status',

        styles: {
          width: 173,
          marginLeft: -6,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 2,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 12,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
      {
        header: 'Last Modified',

        styles: {
          width: 173,
          marginLeft: 10,

          [lightTheme.breakpoints.up('desktop_1280')]: {
            marginLeft: 22,
          },
          [lightTheme.breakpoints.up('desktop_1440')]: {
            marginLeft: 92,
            justifyContent: 'center',
          },
        },
        sortReverse: true,
      },
    ],
  },
];

export const [[HeaderDelegate, HeaderDelegateDark], [HeaderDelegate1194, HeaderDelegate1194Dark]] =
  createThemeModeVariants(HeaderDelegateExpense, variantsArgs);

HeaderDelegate.parameters = {
  figma: {
    component: {
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214492&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200754&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205054&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

HeaderDelegate1194.parameters = {
  chromatic: {
    viewports: [1194],
  },
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241815&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
    },
  },
};
HeaderDelegate1194Dark.parameters = {};
HeaderDelegateDark.parameters = {};
