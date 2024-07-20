import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import CardChartOverview from './CardChartOverview';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardChartOverview> = {
  title: 'Fusion/Views/Finances/Section/CardChartOverview',
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
    selectedMetric: 'Budget',
    handleSelectedMetric: () => null,
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,
    isCoreThirdLevel: false,

    doughnutSeriesData: [
      {
        name: 'Endgame Atlas Budgets',
        value: 1790155,
        percent: 82,
        metrics: {
          budget: {
            value: 1790155,
            unit: 'DAI',
          },
          actuals: {
            value: 9120,
            unit: 'DAI',
          },
          forecast: {
            value: 4436,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 0,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 1790155,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 1790155,
            unit: 'DAI',
          },
          name: '',
        },
        color: '#F99374',
      },
      {
        name: 'Endgame Scope Budgets',
        value: 12000000,
        percent: 12,
        metrics: {
          budget: {
            value: 1790155,
            unit: 'DAI',
          },
          actuals: {
            value: 9120,
            unit: 'DAI',
          },
          forecast: {
            value: 4436,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 0,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 1790155,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 1790155,
            unit: 'DAI',
          },
          name: '',
        },
        color: '#447AFB',
      },
      {
        name: 'MakerDAO Legacy Budgets',
        value: 9000000,
        percent: 8,
        metrics: {
          budget: {
            value: 1790155,
            unit: 'DAI',
          },
          actuals: {
            value: 9120,
            unit: 'DAI',
          },
          forecast: {
            value: 4436,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 0,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 1790155,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 1790155,
            unit: 'DAI',
          },
          name: '',
        },
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=31002:29277&mode=dev',
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
