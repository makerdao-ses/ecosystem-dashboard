import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExpensesChart from './ExpensesChart';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chart.dto';
import type { ComponentMeta, Story } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/ExpensesChart',
  component: ExpensesChart,
  decorators: [
    (Story: Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
} as ComponentMeta<typeof ExpensesChart>;

const args = [
  {
    monthly: [
      {
        period: '1',
        value: 17912500,
      },
      {
        period: '1',
        value: 17912500,
      },
      {
        period: '1',
        value: 172312500,
      },
      {
        period: '1',
        value: 17922500,
      },
    ],
    newActual: [
      {
        itemStyle: {
          borderRadius: [0, 0, 6, 6],
        },

        name: 'Active Budget',
        value: 16965122,
      },
    ] as ValuesDataWithBorder[],

    newDiscontinued: [],
    newPrediction: [],
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(ExpensesChart, args);
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147614',
        options: {
          componentStyle: {
            width: 164,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144213 ',
        options: {
          componentStyle: {
            width: 266.5,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
