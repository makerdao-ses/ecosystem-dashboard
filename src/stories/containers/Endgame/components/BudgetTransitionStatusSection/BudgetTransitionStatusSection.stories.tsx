import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BudgetTransitionStatusSection from './BudgetTransitionStatusSection';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof BudgetTransitionStatusSection> = {
  title: 'Components/Endgame/Budget Transition Status Section',
  component: BudgetTransitionStatusSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    selected: 'Budget',
    handleChange: () => null,
    data: {
      '2021/Q1': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2021/Q2': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2021/Q3': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2021/Q4': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2022/Q1': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2022/Q2': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2022/Q3': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
      '2022/Q4': {
        legacy: 103289909.62499996,
        endgame: 36306730.765775874,
      },
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BudgetTransitionStatusSection, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21089:238342',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:205084',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:212333',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:236972',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20804:270349',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
