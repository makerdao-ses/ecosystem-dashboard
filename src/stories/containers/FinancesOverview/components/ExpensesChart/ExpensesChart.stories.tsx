import { TotalExpenseReportsBuilder } from '@ses/core/businessLogic/builders/totalExpenseReportsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExpensesChart from './ExpensesChart';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof ExpensesChart> = {
  title: 'Components/Finances/ExpensesChart',
  component: ExpensesChart,
  parameters: {
    chromatic: {
      viewports: [375, 768],
    },
  },
};
export default meta;

const args = [
  {
    newActual: [
      {
        value: new TotalExpenseReportsBuilder().withActuals(713684).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(1813684).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(1313684).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(1113684).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(532238).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(900000).build().actuals,
        itemStyle: {
          borderRadius: [6, 6, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(1200000).build().actuals,
        itemStyle: {
          borderRadius: [6, 6, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(1200000).build().actuals,
        itemStyle: {
          borderRadius: [6, 6, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(402385).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },

      {
        value: new TotalExpenseReportsBuilder().withActuals(700000).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(500000).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withActuals(300000).build().actuals,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
    ],
    newDiscontinued: [
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(291567).build().discontinued,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(544567).build().discontinued,

        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(1001576).build().discontinued,

        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(801576).build().discontinued,

        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(855260).build().discontinued,

        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(0).build().discontinued,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(0).build().discontinued,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(0).build().discontinued,
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(1231563).build().discontinued,
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(172334).build().discontinued,
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(1172334).build().discontinued,
        itemStyle: {
          borderRadius: [0, 0, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withDiscontinued(0).build().discontinued,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
    ],
    newPrediction: [
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },

      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(0).build().prediction,
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(1000000).build().prediction,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(1600000).build().prediction,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(1370000).build().prediction,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        value: new TotalExpenseReportsBuilder().withPrediction(900000).build().prediction,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ExpensesChart, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13056%3A123466&t=CFEpU7Gadr2fxQ94-4',
        options: {
          componentStyle: {
            width: 343,
            height: 265,
          },
          style: {
            top: 0,
            left: -1,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:141272',
        options: {
          componentStyle: {
            width: 607,
            height: 387,
          },
          style: {
            top: 0,
            left: 2,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=15343:203943',
        options: {
          componentStyle: {
            width: 504,
            height: 387,
          },
          style: {
            top: 0,
            left: -21,
          },
        },
      },
    },
  } as FigmaParams,
};
