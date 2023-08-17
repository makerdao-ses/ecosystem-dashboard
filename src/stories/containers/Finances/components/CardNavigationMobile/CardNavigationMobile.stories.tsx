import EndgameAtlasBudgets from '@ses/containers/Finances/components/EndgameAtlasBudgets';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardNavigationMobile from './CardNavigationMobile';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/CardNavigationMobile',
  component: CardNavigationMobile,

  parameters: {
    chromatic: {
      viewports: [357],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardNavigationMobile>;

const args = [
  {
    svgImage: <EndgameAtlasBudgets height={32} width={32} />,
    title: 'Endgame Atlas Budgets',
    href: '#',
    totalDai: 8950775,
    valueDai: 1790155,
    barColor: '#F99374',
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardNavigationMobile, args);

LightMode.parameters = {
  figma: {
    component: {
      357: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22857:196080&mode=dev',
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
