import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import HeaderTable from './HeaderTable';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/HeaderTable',
  component: HeaderTable,

  parameters: {
    chromatic: {
      viewports: [1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof HeaderTable>;

const args = [
  {
    metrics: ['Budget', 'Actuals', 'On-chain'],
    period: 'Quarterly',
    title: 'MakerDAO Budget',
    year: '2023',
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(HeaderTable, args);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200140&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:204440&mode=dev',
        options: {
          componentStyle: {
            width: 1792,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
    },
  } as FigmaParams,
};
