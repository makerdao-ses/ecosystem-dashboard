import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import VisualizationCard from './VisualizationCard';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof VisualizationCard> = {
  title: 'Components/Delegate/VisualizationCard',
  component: VisualizationCard,
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
      viewports: [375, 834, 1194, 1280, 1440],
    },
  },
};
export default meta;
const variantsArgs = [
  {
    delegatesExpenses: 2222252,
    otherExpenses: 50500000,
    totalDelegates: 25,
  },
];

const [[TotalExpense, TotalExpenseDark]] = createThemeModeVariants(VisualizationCard, variantsArgs);
export { TotalExpense, TotalExpenseDark };

TotalExpense.parameters = {
  figma: {
    component: {
      0: {
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
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724%3A195974',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 522,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:193318&t=qcJp8iQtowTTi5I4-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 538,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:189891&t=9oUrboY6uTU5mhxB-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 546,
          },
        },
      },
    },
  },
};

TotalExpenseDark.parameters = {};
