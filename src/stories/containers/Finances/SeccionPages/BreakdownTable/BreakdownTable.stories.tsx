import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreakdownTable from './BreakdownTable';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/NewFinances/BreakdownTable',
  component: BreakdownTable,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof BreakdownTable>;

const args = [{}];
export const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownTable, args);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22581:78816&mode=dev',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
    },
  } as FigmaParams,
};
