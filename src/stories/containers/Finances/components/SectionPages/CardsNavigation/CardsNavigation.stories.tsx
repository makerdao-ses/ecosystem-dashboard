import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
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
    allBudgets: [
      new BudgetBuilder()
        .withId('1')
        .withParentId('45')
        .withName('End-game Atlas Immutable')
        .withCode('atlas/immutable')
        .withCodePath('atlas/immutable')
        .build(),
    ],
    cardsNavigationInformation: [
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg',
        title: 'Endgame Atlas Budgets',
        description: 'Finances of the core governance constructs described in the Maker Atlas.',
        href: '#',
        totalDai: 12345,
        color: '#F99374',
        allBudgets: [
          new BudgetBuilder()
            .withId('1')
            .withParentId('45')
            .withName('End-game Atlas Immutable')
            .withCode('atlas/immutable')
            .withCodePath('atlas/immutable')
            .build(),
        ],
        codePath: 'atlas/immutable',
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12345,
        color: '#447AFB',
        allBudgets: [
          new BudgetBuilder()
            .withId('1')
            .withParentId('45')
            .withName('End-game Atlas Immutable')
            .withCode('atlas/immutable')
            .withCodePath('atlas/immutable/ACC')
            .build(),
        ],
        codePath: 'atlas/immutable',
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 12345,
        color: '#2DC1B1',
        allBudgets: [
          new BudgetBuilder()
            .withId('1')
            .withParentId('45')
            .withName('End-game Atlas Immutable')
            .withCode('atlas/immutable')
            .withCodePath('atlas/immutable/ACC')
            .build(),
        ],
        codePath: 'atlas/immutable',
      },
    ],
  },
  {
    cardsNavigationInformation: [
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg',
        title: 'Endgame Atlas Budgets',
        description: 'Finances of the core governance constructs described in the Maker Atlas.',
        href: '#',
        totalDai: 1790155,
        valueDai: 1734955,
        color: '#F99374',
        isMobile: true,
        percent: 50,
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12000000,
        valueDai: 12000000,
        color: '#447AFB',
        percent: 38,
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 9000000,
        valueDai: 1734955,
        color: '#2DC1B1',
        percent: 12,
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331292&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:329647&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:334316&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335845&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:332761&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:337388&mode=dev',
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
