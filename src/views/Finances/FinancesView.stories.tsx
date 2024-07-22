import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { BreakdownBudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/analyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';
import FinancesView from './FinancesView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FinancesView> = {
  title: 'Fusion/Pages/Finances Views',
  component: FinancesView,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      router: {
        pathname: '/finances',
      },
    },

    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    budgets: [
      new BudgetBuilder()
        .withParentId(null)
        .withName('Endgame Atlas Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('1')
        .withDescription('Description of the budget')
        .withCodePath('atlas/inmutable')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('Endgame Scope Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('2')
        .withDescription('Description of the budget')
        .withCodePath('atlas/scope')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('MakerDAO Legacy Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('3')
        .withDescription('Description of the budget')
        .withCodePath('atlas/legacy')
        .withCode('fds')
        .build(),
    ],
    yearsRange: ['2023', '2022'],
    initialYear: '2023',
    activeMetrics: ['Actuals', 'Quarterly'],
    budgetsAnalyticsQuarterly: new BreakdownBudgetAnalyticBuilder()
      .withCategory('atlas/scope', [
        {
          actuals: {
            value: 100,
            unit: 'DAI',
          },
          budget: {
            value: 200,
            unit: 'DAI',
          },
          forecast: {
            value: 300,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 400,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 500,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 100,
            unit: 'DAI',
          },
          budget: {
            value: 200,
            unit: 'DAI',
          },
          forecast: {
            value: 300,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 400,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 500,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 100,
            unit: 'DAI',
          },
          budget: {
            value: 200,
            unit: 'DAI',
          },
          forecast: {
            value: 300,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 400,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 500,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 150,
            unit: 'DAI',
          },
          budget: {
            value: 250,
            unit: 'DAI',
          },
          forecast: {
            value: 350,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 450,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 550,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
      ])
      .withCategory('atlas/legacy', [
        {
          actuals: {
            value: 300,
            unit: 'DAI',
          },
          budget: {
            value: 400,
            unit: 'DAI',
          },
          forecast: {
            value: 500,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 600,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 700,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 350,
            unit: 'DAI',
          },
          budget: {
            value: 450,
            unit: 'DAI',
          },
          forecast: {
            value: 550,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 650,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 750,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 300,
            unit: 'DAI',
          },
          budget: {
            value: 400,
            unit: 'DAI',
          },
          forecast: {
            value: 500,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 600,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 700,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
        {
          actuals: {
            value: 300,
            unit: 'DAI',
          },
          budget: {
            value: 400,
            unit: 'DAI',
          },
          forecast: {
            value: 500,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 600,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 700,
            unit: 'DAI',
          },
          protocolNetOutflow: {
            value: 600,
            unit: 'DAI',
          },
        },
      ])
      .build(),

    budgetsAnalytics: [
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('test', [
          {
            actuals: {
              value: 5000,
              unit: 'DAI',
            },
            budget: {
              value: 10000,
              unit: 'DAI',
            },
            forecast: {
              value: 3440,
              unit: 'DAI',
            },
            paymentsOnChain: {
              value: 3430,
              unit: 'DAI',
            },
            paymentsOffChainIncluded: {
              value: 343430,
              unit: 'DAI',
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <FinancesView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

// TODO: temporary disabled until we fix the story args
// export { LightMode, DarkMode };
