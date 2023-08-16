import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardsNavigation from './CardsNavigation';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'General/NewFinances/CardsNavigation',
  component: CardsNavigation,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardsNavigation>;

const args = [{}];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardsNavigation, args);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22641:221346&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
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
