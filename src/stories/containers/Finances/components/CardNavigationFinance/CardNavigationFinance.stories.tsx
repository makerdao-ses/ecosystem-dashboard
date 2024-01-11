import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import CardNavigationFinance from './CardNavigationFinance';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardNavigationFinance> = {
  title: 'Components/NewFinances/CardNavigationFinance',
  component: CardNavigationFinance,

  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    image: 'https://i.ibb.co/vXD0xDp/atlas.png',
    title: 'Endgame Atlas Budgets',
    description: 'Finances of the core governance constructs described in the Maker Atlas.',
    href: '#',
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(CardNavigationFinance, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331293&mode=dev',
        options: {
          componentStyle: {
            width: 224,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:329648&mode=dev',
        options: {
          componentStyle: {
            width: 309.33,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:334317&mode=dev',
        options: {
          componentStyle: {
            width: 246,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335846&mode=dev',
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
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:332762&mode=dev',
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
