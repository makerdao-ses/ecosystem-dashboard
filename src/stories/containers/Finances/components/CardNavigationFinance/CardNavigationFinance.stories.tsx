import EndgameAtlasBudgets from '@ses/components/svg/EndgameAtlasBudgets';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import CardNavigationFinance from './CardNavigationFinance';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/CardNavigationFinance',
  component: CardNavigationFinance,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardNavigationFinance>;

const args = [
  {
    svgImage: <EndgameAtlasBudgets />,
    title: 'Endgame Atlas Budgets',
    description: 'Finances of the core governance constructs described in the Maker Atlas.',
    href: '#',
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardNavigationFinance, args);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22641:221347&mode=dev',
        options: {
          componentStyle: {
            width: 416,
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
