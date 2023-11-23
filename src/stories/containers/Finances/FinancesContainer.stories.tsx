import { BudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/budgetAnalyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';

import FinancesContainer from './FinacesContainer';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/FinancesContainer',
  component: FinancesContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/finances',
    },

    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof FinancesContainer>;

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
        .withCodePath('atlas/sds/fds')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('Endgame Scope Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('2')
        .withDescription('Description of the budget')
        .withCodePath('atlas/sds/fds')
        .withCode('fds')
        .build(),
      new BudgetBuilder()
        .withParentId(null)
        .withName('MakerDAO Legacy Budgets')
        .withImage('budget.jpg')
        .withIdPath('1/6/7')
        .withId('3')
        .withDescription('Description of the budget')
        .withCodePath('atlas/sds/fds')
        .withCode('fds')
        .build(),
    ],
    yearsRange: ['2023', '2022'],
    initialYear: '2023',
    budgetsAnalytics: [
      new BudgetAnalyticBuilder()
        .withCodePath('test')
        .withMetric({
          actuals: {
            value: 5000,
            unit: 'DAI',
          },
          budget: {
            value: 10000,
            unit: 'DAI',
          },
          forecast: {
            value: 0,
            unit: 'DAI',
          },
          paymentsOnChain: {
            value: 0,
            unit: 'DAI',
          },
          paymentsOffChainIncluded: {
            value: 0,
            unit: 'DAI',
          },
        })
        .build(),
    ],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <FinancesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

LightMode.parameters = {};
