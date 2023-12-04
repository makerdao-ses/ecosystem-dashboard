import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardChartOverview from './CardChartOverview';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardChartOverview> = {
  title: 'Components/NewFinances/Section/CardChartOverview',
  component: CardChartOverview,

  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
  },
};
export default meta;

const args = [
  {
    filters: ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'],
    filterSelected: 'Budget',
    handleSelectFilter: () => null,
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,
    isCoreThirdLevel: false,

    doughnutSeriesData: [
      {
        name: 'Endgame Atlas Budgets',
        value: 1790155,
        percent: 82,
        actuals: 9.6,
        budgetCap: 12.9,
        color: '#F99374',
      },
      {
        name: 'Endgame Scope Budgets',
        value: 12000000,
        percent: 12,
        actuals: 5.6,
        budgetCap: 42.9,
        color: '#447AFB',
      },
      {
        name: 'MakerDAO Legacy Budgets',
        value: 9000000,
        percent: 8,
        actuals: 19.6,
        budgetCap: 12.9,
        color: '#2DC1B1',
      },
    ] as DoughnutSeries[],
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(CardChartOverview, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331224&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:329579&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -20,

            left: -38,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:334248&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335777&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:332693&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -38,
          },
        },
      },
    },
  } as FigmaParams,
};

DarkMode.parameters = {};
