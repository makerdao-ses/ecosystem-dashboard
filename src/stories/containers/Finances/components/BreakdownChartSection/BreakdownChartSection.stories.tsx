import { BudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/budgetAnalyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
// import { atlasBudget, legacyBudget, scopeBudget } from '../../utils/utils';
import BreakdownChartSection from './BreakdownChartSection';
// import type { BreakdownChartSectionProps } from './BreakdownChartSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BreakdownChartSection> = {
  title: 'Components/NewFinances/Section/BreakdownChartSection',
  component: BreakdownChartSection,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const args = [
  {
    year: '2023',
    selectedMetric: 'monthly',
    onMetricChange: () => null,
    selectedGranularity: 'monthly',
    onGranularityChange: () => null,
    isDisabled: false,
    handleResetFilter: () => null,
    budgets: [
      new BudgetBuilder()
        .withCode('id')
        .withName('Atlas Budgets')
        .withCodePath('atlas/legacy')
        .withDescription('some')
        .withId('23')
        .withIdPath('atlas/legooacy')
        .withImage('')
        .withParentId('34')
        .build(),
    ],
    budgetsAnalyticsMonthly: {
      'atlas/legacy': [
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
        new BudgetAnalyticBuilder()
          .withMetric('atlas/legacy', {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
          })
          .build(),
      ],
    },
    budgetsAnalyticsQuarterly: {},
    series: [
      {
        name: 'Endgame Atlas ',
        data: [4, 4, 46, 90, 34, 34, 34, 34, 34, 21, 12, 23],
        type: 'bar',
        stack: 'x',
        // barWidth: 40,
        showBackground: false,
        itemStyle: {
          color: '#F99374',
        },
        isVisible: true,
      },
      {
        name: 'Endgame Scopes',
        data: [4, 4, 46, 90, 34, 34, 34, 34, 34, 21, 12, 23],
        type: 'bar',
        stack: 'x',
        // barWidth: 40,
        showBackground: false,
        itemStyle: {
          color: '#447AFB',
        },
        isVisible: true,
      },
      {
        name: 'MakerDAO Legacy',
        data: [4, 4, 46, 90, 34, 34, 34, 34, 34, 21, 12, 23],
        type: 'bar',
        stack: 'x',
        // barWidth: 40,
        showBackground: false,
        itemStyle: {
          color: '#2DC1B1',
        },
        isVisible: true,
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownChartSection, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:337473&mode=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331338&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:329693&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:334362&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335891&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
    },
  },
};
