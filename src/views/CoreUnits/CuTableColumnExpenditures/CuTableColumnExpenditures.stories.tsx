import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnExpenditures } from './CuTableColumnExpenditures';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuTableColumnExpenditures> = {
  title: 'Fusion/CoreUnits/ColumnExpenditures',
  component: CuTableColumnExpenditures,
  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    value: 16705,
    percent: 96,
    items: [{ value: 70 }, { value: 50 }, { value: 60 }],
    budgetCaps: [90, 80, 100],
    months: ['2022-09-26T09:08:34.123', '2022-11-26T09:08:34.123', '2022-12-26T09:08:34.123'],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CuTableColumnExpenditures, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=342:66212&t=sZngu2bqQnaT6GMP-4',
        options: {
          style: {
            top: -8,

            left: 0,
          },
        },
      },

      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331-45331&t=sZngu2bqQnaT6GMP-4',
        options: {
          style: {
            top: -8,

            left: 0,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331-43684&t=sZngu2bqQnaT6GMP-4',
        options: {
          style: {
            top: -8,

            left: 0,
          },
        },
      },
    },
  },
};
