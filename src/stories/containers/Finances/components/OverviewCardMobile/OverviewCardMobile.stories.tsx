import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import OverviewCardMobile from './OverviewCardMobile';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/OverviewCardMobile',
  component: OverviewCardMobile,

  parameters: {
    chromatic: {
      viewports: [357],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof OverviewCardMobile>;

const args = [
  {
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(OverviewCardMobile, args);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22857:196036&mode=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};

DarkMode.parameters = {};
