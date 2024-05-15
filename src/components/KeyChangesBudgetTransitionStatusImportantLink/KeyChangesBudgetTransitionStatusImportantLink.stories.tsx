import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import KeyChangesBudgetTransitionStatusImportantLink from './KeyChangesBudgetTransitionStatusImportantLink';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof KeyChangesBudgetTransitionStatusImportantLink> = {
  title: 'Fusion/Endgame/KeyChangesBudgetTransitionStatusImportantLink',
  component: KeyChangesBudgetTransitionStatusImportantLink,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(KeyChangesBudgetTransitionStatusImportantLink, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=219:46442&t=CcFaruzGPjTWsERD-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=208:27363&t=CcFaruzGPjTWsERD-4',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=160:3142&t=CcFaruzGPjTWsERD-4',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=61:22131&t=CcFaruzGPjTWsERD-4',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=61:17874&t=CcFaruzGPjTWsERD-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
