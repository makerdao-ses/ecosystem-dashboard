import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCard from './QuarterCard';
import type { ComponentMeta, Story } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/QuarterCard',
  component: QuarterCard,
  decorators: [
    (Story: Story) => (
      <div style={{ maxWidth: 270 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} as ComponentMeta<typeof QuarterCard>;

const args = [
  {
    period: '2022-Q4',
    prediction: 5822365.0,
    actuals: 5083445.0,
    budgetCap: 8394564.0,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCard, args);
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
