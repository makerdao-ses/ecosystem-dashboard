import { TotalExpenseReportsBuilder } from '@ses/core/business-logic/builders/totalExpenseReportsBuilder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../layout/layout';
import FinancesOverviewContainer from './finances-overview';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Finances Overview',
  component: FinancesOverviewContainer,
  decorators: [withoutSBPadding],
  chromatic: {
    viewports: [375, 834, 1194],
    pauseAnimationAtEnd: true,
  },
} as ComponentMeta<typeof FinancesOverviewContainer>;

const variantsArgs = [
  {
    quarterExpenses: [
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
    monthlyExpenses: [
      new TotalExpenseReportsBuilder().withPrediction(425631).withActuals(5082362).withMonthlyPeriod(2022, 1).build(),
      new TotalExpenseReportsBuilder().withPrediction(3451235).withActuals(2451235).withMonthlyPeriod(2022, 2).build(),
      new TotalExpenseReportsBuilder().withPrediction(5311111).withActuals(1111454).withMonthlyPeriod(2022, 3).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(222222)
        .withActuals(3522355)
        .withDiscontinued(2235632)
        .withMonthlyPeriod(2022, 4)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(245325).withActuals(745225).withMonthlyPeriod(2022, 5).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(6325521)
        .withActuals(4242531)
        .withDiscontinued(365236)
        .withMonthlyPeriod(2022, 6)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(1242156)
        .withDiscontinued(1125543)
        .withMonthlyPeriod(2022, 7)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(4231563).withActuals(53624).withMonthlyPeriod(2022, 8).build(),
      new TotalExpenseReportsBuilder().withPrediction(4231563).withActuals(5233362).withMonthlyPeriod(2022, 9).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(645225)
        .withDiscontinued(235632)
        .withMonthlyPeriod(2022, 10)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(4231563).withActuals(4632531).withMonthlyPeriod(2022, 11).build(),
      new TotalExpenseReportsBuilder().withPrediction(4231563).withActuals(1242156).withMonthlyPeriod(2022, 12).build(),
    ],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <FinancesOverviewContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147318',
        options: {
          componentStyle: {
            width: 375,
          },
          ...optionStyles,
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144726',
        options: {
          componentStyle: {
            width: 834,
          },
          ...optionStyles,
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144041',
        options: {
          componentStyle: {
            width: 1194,
          },
          ...optionStyles,
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A143348&t=S4S1EOIX3ZWEgsv5-4',
        options: {
          componentStyle: {
            width: 1280,
          },
          ...optionStyles,
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A141978&t=S4S1EOIX3ZWEgsv5-4',
        options: {
          componentStyle: {
            width: 1440,
          },
          ...optionStyles,
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A142663&t=S4S1EOIX3ZWEgsv5-4',
        options: {
          componentStyle: {
            width: 1920,
          },
          ...optionStyles,
        },
      },
    },
  } as FigmaParams,
};
