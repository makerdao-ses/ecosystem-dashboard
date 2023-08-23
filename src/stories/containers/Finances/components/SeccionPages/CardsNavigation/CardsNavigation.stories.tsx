import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EndgameAtlasBudgets from '../../EndgameAtlasBudgets';
import EndgameScopeBudgets from '../../EndgameScopeBudgets';
import MakerDAOLegacyBudgets from '../../MakerDAOLegacyBudgets';
import CardsNavigation from './CardsNavigation';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/CardsNavigation',
  component: CardsNavigation,

  parameters: {
    chromatic: {
      viewports: [375, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardsNavigation>;

const args = [
  {
    cardsNavigationInformation: [
      {
        svgImage: <EndgameAtlasBudgets />,
        title: 'Endgame Atlas Budgets',
        description: 'Finances of the core governance constructs described in the Maker Atlas.',
        href: '#',
        totalDai: 12345,
        color: '#F99374',
      },
      {
        svgImage: <EndgameScopeBudgets />,
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12345,
        color: '#447AFB',
      },
      {
        svgImage: <MakerDAOLegacyBudgets />,
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 12345,
        color: '#2DC1B1',
      },
    ],
  },
  {
    cardsNavigationInformation: [
      {
        svgImage: <EndgameAtlasBudgets width={32} height={32} />,
        title: 'Endgame Atlas Budgets',
        description: 'Finances of the core governance constructs described in the Maker Atlas.',
        href: '#',
        totalDai: 12345,
        color: '#F99374',
      },
      {
        svgImage: <EndgameScopeBudgets width={32} height={32} />,
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12345,
        color: '#447AFB',
      },
      {
        svgImage: <MakerDAOLegacyBudgets width={32} height={32} />,
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 12345,
        color: '#2DC1B1',
      },
    ],
  },
];
export const [[LightMode, DarkMode], [Mobile, MobileDark]] = createThemeModeVariants(CardsNavigation, args);

LightMode.parameters = {
  figma: {
    component: {
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22977:247036&mode=dev',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241009&mode=dev',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },

      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:213686&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
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
      1920: {
        component:
          'https:///www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:204248&mode=dev',
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
DarkMode.parameters = {};

Mobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22857:196079&mode=design&t=sM71I6qiw3fWBmkW-4',
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
MobileDark.parameters = {};
