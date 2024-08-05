import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import FinancesLineChartCard from './FinancesLineChartCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FinancesLineChartCard> = {
  title: 'Fusion/Views/Home/FinancesLineChartCard',
  component: FinancesLineChartCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(FinancesLineChartCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-32011&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-29764&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-27017&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-24134&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-0.75rem',
            left: '50%',
            transform: 'translate(-50%, 0)',
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-14137&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-0.75rem',
            left: '50%',
            transform: 'translate(-50%, 0)',
          },
        },
      },
    },
  } as FigmaParams,
};
