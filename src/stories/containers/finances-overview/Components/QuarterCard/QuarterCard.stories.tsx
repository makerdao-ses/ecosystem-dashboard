import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCard from './QuarterCard';
import type { ComponentMeta, Story } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/QuarterCard',
  component: QuarterCard,
  decorators: [
    (Story: Story) => (
      <div style={{ width: 164 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} as ComponentMeta<typeof QuarterCard>;

const args = [
  {
    period: '2022-Q4',
    prediction: 13512500.0,
    actuals: 12465122.0,
    budgetCap: 15132650.0,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCard, args);
LightMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147614',
    options: {
      style: {
        top: -1,
        left: -40,
      },
    },
  } as FigmaParams,
};
