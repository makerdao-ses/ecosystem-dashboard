import { TotalExpenseReportsBuilder } from '@ses/core/businessLogic/builders/totalExpenseReportsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCarousel from './QuarterCarousel';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof QuarterCarousel> = {
  title: 'Components/Finances/QuarterCarousel',
  component: QuarterCarousel,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1440],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
};
export default meta;

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
const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCarousel, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15491:165961&t=0uzloS94rCOJjOj1-4',
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
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:141133',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -2,
            left: -39,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:137092',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=13399:143459',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15343:199190&t=1jQcjZZk6fFlTwlR-4',
        options: {
          componentStyle: {
            width: 1312,
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
