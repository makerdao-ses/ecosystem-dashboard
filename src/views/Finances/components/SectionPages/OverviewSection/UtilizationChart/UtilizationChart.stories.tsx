import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import UtilizationChart from './UtilizationChart';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof UtilizationChart> = {
  title: 'Fusion/Views/Finances/Section/Utilization Chart',
  component: UtilizationChart,

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
    handleMetricChange: () => null,
    isCoreThirdLevel: false,

    seriesData: [
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
const [[LightMode, DarkMode]] = createThemeModeVariants(UtilizationChart, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-12878',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-10805',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-6584',
        options: {
          componentStyle: {
            width: 632,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-4008',
        options: {
          componentStyle: {
            width: 789,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8-10351',
        options: {
          componentStyle: {
            width: 864,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

DarkMode.parameters = {};
