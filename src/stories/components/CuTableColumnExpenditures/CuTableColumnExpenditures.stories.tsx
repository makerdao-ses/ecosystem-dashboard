import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnExpenditures } from './CuTableColumnExpenditures';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuTableColumnExpenditures> = {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CuTableColumnExpenditures,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    value: 16705,
    percent: 96,
    items: [{ value: 70 }, { value: 85 }, { value: 120 }],
    budgetCaps: [90, 80, 100],
    months: ['2022-12-26T09:08:34.123', '2022-12-26T09:08:34.123', '2022-12-26T09:08:34.123'],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CuTableColumnExpenditures, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2108%3A9986',
        options: {
          style: {
            top: -6,
            left: -27,
          },
        },
      },

      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2108%3A9986',
        options: {
          style: {
            top: -6,
            left: -27,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2108%3A9986',
        options: {
          style: {
            top: -1,
            left: -22,
          },
        },
      },
    },
  },
};
