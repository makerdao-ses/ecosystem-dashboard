import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCard from './QuarterCard';
import type { ComponentMeta, Story } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/QuarterCard',
  component: QuarterCard,
  decorators: [
    (Story: Story) => (
      <div style={{ maxWidth: 270.5 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
} as ComponentMeta<typeof QuarterCard>;

const args = [
  {
    period: '2023-Q1',
    prediction: 4232236.0,
    actuals: 5083445.0,
    budgetCap: 8394564.0,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCard, args);
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147644',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144929',
        options: {
          componentStyle: {
            width: 246,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144244',
        options: {
          componentStyle: {
            width: 270.5,
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
