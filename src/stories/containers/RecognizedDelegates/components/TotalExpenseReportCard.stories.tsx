import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import TotalExpenseReportCard from './TotalExpenseReportCard';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TotalExpenseReportCard> = {
  title: 'Components/Delegate/TotalExpenseReportCard',
  component: TotalExpenseReportCard,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    start: DateTime.fromISO('2021-11-01'),
    end: DateTime.fromISO('2023-06-01'),
    totalDAI: 2130885,
  },
];

const [[TotalExpense, TotalExpenseDark]] = createThemeModeVariants(TotalExpenseReportCard, variantsArgs);
export { TotalExpense, TotalExpenseDark };

TotalExpense.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208037&t=SXR1v9cUgs1wOSb8-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 311,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:203740&t=jLRG7vNdHbvDtBzQ-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 738,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:195955&t=jLRG7vNdHbvDtBzQ-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1098,
          },
        },
      },
    },
  },
};

TotalExpenseDark.parameters = {};
