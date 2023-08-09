import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import InformationBudgetCapOverView from '../../components/OverviewCardKeyDetailsBudget/InformationBudgetCapOverView/InformationBudgetCapOverView';
import CardChartOverview from './CardChartOverview';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/NewFinances/CardChartOverview',
  component: InformationBudgetCapOverView,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardChartOverview>;

const args = [
  {
    filters: ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'],
    filterSelected: 'Budget',
    handleSelectFilter: () => null,
    actuals: 9120,
    budgetCap: 9120,
    prediction: 4436,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardChartOverview, args);
LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22069:257647&mode=dev',
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
