import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateChart from './DelegateChart';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/Chart',
  component: DelegateChart,
  parameters: {
    chromatic: {
      viewports: [375, 834],
    },
  },
} as ComponentMeta<typeof DelegateChart>;
const variantsArgs = [
  {
    expenses: [
      64523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023,
      97321, 120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
    ],
    months: ['N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J'],
  },
];

export const [[Chart, ChartDark]] = createThemeModeVariants(DelegateChart, variantsArgs);

Chart.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208103&t=neFYoZhbEqS5Zn38-4',
        options: {
          style: {
            left: 2,
            top: 24,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:198656&t=Lk6dSYBrypHOTQ8a-4',
        options: {
          style: {
            left: 21,
            top: 21,
          },
          componentStyle: {
            width: 690,
          },
        },
      },
    },
  },
};

ChartDark.parameters = {};
