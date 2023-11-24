import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import QuarterCard from './QuarterCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof QuarterCard> = {
  title: 'Components/Finances/QuarterCard',
  component: QuarterCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 310 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1440],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {},
};
export default meta;

const args = [
  {
    period: '2023-Q1',
    prediction: 4232236.0,
    actuals: 5083445.0,
    budgetCap: 8394564.0,
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(QuarterCard, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15491:166053&t=0uzloS94rCOJjOj1-4',
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
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:141224',
        options: {
          componentStyle: {
            width: 224,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:137183',
        options: {
          componentStyle: {
            width: 228,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=13399:143551',
        options: {
          componentStyle: {
            width: 284,
          },
          style: {
            top: -1,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15343:199281&t=u7vF8lSvHCDE6Xof-4',
        options: {
          componentStyle: {
            width: 310,
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
