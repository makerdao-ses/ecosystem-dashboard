import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import VisualizationCard from './VisualizationCard';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/VisualizationCard',
  component: VisualizationCard,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
    },
  },
} as ComponentMeta<typeof VisualizationCard>;
const variantsArgs = [
  {
    delegatesExpenses: 2222252,
    otherExpenses: 50500000,

    amountDelegates: 21,
  },
];

export const [[TotalExpense, TotalExpenseDark]] = createThemeModeVariants(VisualizationCard, variantsArgs);

TotalExpense.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208068&t=Lk6dSYBrypHOTQ8a-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:203760&t=Lk6dSYBrypHOTQ8a-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: '738px',
          },
        },
      },
    },
    1194: {
      component:
        'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:195974&t=gzHrEzPrqS6ghKec-4',
      options: {
        style: {
          left: -40,
          top: -20,
        },
        componentStyle: {
          width: '522px',
        },
      },
    },
    // 1280: {
    //   component:
    //     'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:193318&t=qcJp8iQtowTTi5I4-4',
    //   options: {
    //     style: {
    //       left: -40,
    //       top: -20,
    //     },
    //     componentStyle: {
    //       width: 538,
    //     },
    //   },
    // },
  },
};

TotalExpenseDark.parameters = {};
