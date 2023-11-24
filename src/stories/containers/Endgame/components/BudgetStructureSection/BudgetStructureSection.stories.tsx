import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BudgetStructureSection from './BudgetStructureSection';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof BudgetStructureSection> = {
  title: 'Components/Endgame/Budget Structure Section',
  component: BudgetStructureSection,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(BudgetStructureSection, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21089:238282',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:205024',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:212273',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:236912',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20804:270289',
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
