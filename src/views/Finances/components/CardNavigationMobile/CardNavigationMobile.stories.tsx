import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardNavigationMobile from './CardNavigationMobile';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardNavigationMobile> = {
  title: 'Components/NewFinances/CardNavigationMobile',
  component: CardNavigationMobile,

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
    image: 'https://i.ibb.co/vXD0xDp/atlas.png',
    title: 'Endgame Atlas Budgets',
    href: '#',
    totalDai: 8950775,
    valueDai: 1790155,
    barColor: '#F99374',
    percent: 23.0,
    budgetCap: 10000000,
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(CardNavigationMobile, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      357: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:337389&mode=dev',
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
