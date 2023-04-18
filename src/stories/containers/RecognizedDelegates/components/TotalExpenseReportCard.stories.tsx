import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import TotalExpenseReportCard from './TotalExpenseReportCard';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/TotalExpenseReportCard',
  component: TotalExpenseReportCard,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof TotalExpenseReportCard>;
const variantsArgs = [
  {
    start: 'Nov 2021',
    end: 'Jun 2023',
    totalDAI: 2130885,
  },
];

export const [[TotalExpense, TotalExpenseDark]] = createThemeModeVariants(TotalExpenseReportCard, variantsArgs);

TotalExpense.parameters = {
  figma: {
    component: {
      375: {
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
