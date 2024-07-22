import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BudgetUtilizationCard from './BudgetUtilizationCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof BudgetUtilizationCard> = {
  title: 'Fusion/Views/Finances/Budget Utilization Card',
  component: BudgetUtilizationCard,

  parameters: {
    chromatic: {
      viewports: [375, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    paymentsOnChain: 5017100,
    budgetCap: 9122000,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BudgetUtilizationCard, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-12845',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-10772',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-6551',
        options: {
          componentStyle: {
            width: 304,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:211743&mode=dev',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22069:258713&mode=dev',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205711&mode=dev',
        options: {
          componentStyle: {
            width: 1920,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
    },
  } as FigmaParams,
};
