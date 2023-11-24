import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EndgameAtlasBudgets from '../../EndgameAtlasBudgets';
import EndgameScopeBudgets from '../../EndgameScopeBudgets';
import MakerDAOLegacyBudgets from '../../MakerDAOLegacyBudgets';
import CardsNavigation from './CardsNavigation';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardsNavigation> = {
  title: 'Components/NewFinances/Section/CardsNavigation',
  component: CardsNavigation,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
      delay: 1000,
    },
  },
};
export default meta;

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
        totalDai: 1790155,
        valueDai: 1734955,
        color: '#F99374',
        isMobile: true,
      },
      {
        svgImage: <EndgameScopeBudgets width={32} height={32} />,
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12000000,
        valueDai: 12000000,
        color: '#447AFB',
      },
      {
        svgImage: <MakerDAOLegacyBudgets width={32} height={32} />,
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 9000000,
        valueDai: 1734955,
        color: '#2DC1B1',
      },
    ],
  },
];
const [[LightMode, DarkMode], [Mobile, MobileDark]] = createThemeModeVariants(CardsNavigation, args);
export { LightMode, DarkMode, Mobile, MobileDark };

LightMode.parameters = {
  chromatic: {
    viewports: [768, 1024, 1280, 1440, 1920],
  },
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:99759&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:201556&mode=dev',
        options: {
          componentStyle: {
            width: 960,
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
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24365:94856&mode=dev',
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
