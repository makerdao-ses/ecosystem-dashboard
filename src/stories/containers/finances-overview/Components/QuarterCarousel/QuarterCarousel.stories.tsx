import { TotalExpenseReportsBuilder } from '@ses/core/business-logic/builders/totalExpenseReportsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCarousel from './QuarterCarousel';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/QuarterCarousel',
  component: QuarterCarousel,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
} as ComponentMeta<typeof QuarterCarousel>;

const args = [
  {
    quarters: [
      new TotalExpenseReportsBuilder()
        .withPrediction(5236845)
        .withActuals(4521236)
        .withBudgetCap(6523658)
        .withQuarterPeriod(2021, 3)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(5236845)
        .withActuals(4521236)
        .withBudgetCap(6523658)
        .withQuarterPeriod(2021, 4)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(5236845)
        .withActuals(4521236)
        .withBudgetCap(6523658)
        .withQuarterPeriod(2022, 1)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(9121456)
        .withActuals(9191222)
        .withBudgetCap(9562451)
        .withQuarterPeriod(2022, 2)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4232845)
        .withActuals(5432168)
        .withBudgetCap(6392563)
        .withQuarterPeriod(2022, 3)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(5821236)
        .withActuals(5082362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 4)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(5082362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2023, 1)
        .build(),
    ],
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCarousel, args);
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147553',
        options: {
          componentStyle: {
            maxWidth: 348,
          },
          style: {
            top: 0,
            left: -382,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144837',
        options: {
          componentStyle: {
            width: 771,
          },
          style: {
            top: 0,
            left: -39,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144152',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
