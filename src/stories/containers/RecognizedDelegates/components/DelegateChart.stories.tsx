import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import DelegateChart from './DelegateChart';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateChart> = {
  title: 'Components/Delegate/Chart',
  component: DelegateChart,
  parameters: {
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    expenses: [
      14523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023,
      97321, 120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
    ],
    startDate: DateTime.fromISO('2021-11-01'),
    endDate: DateTime.fromISO('2023-03-01'),
    totalDaiDelegates: 1594292,
  },
];

const [[Chart, ChartDark]] = createThemeModeVariants(DelegateChart, variantsArgs);
export { Chart, ChartDark };

Chart.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208103&t=rZFX885hWtT01PVt-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=17435:201839&t=rZFX885hWtT01PVt-4',
        options: {
          style: {
            left: -2,
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
