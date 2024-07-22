import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import OverviewCardMobile from './OverviewCardMobile';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof OverviewCardMobile> = {
  title: 'Fusion/Views/Finances/OverviewCardMobile',
  component: OverviewCardMobile,

  parameters: {
    chromatic: {
      viewports: [357],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(OverviewCardMobile, args);
export { LightMode, DarkMode };

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
