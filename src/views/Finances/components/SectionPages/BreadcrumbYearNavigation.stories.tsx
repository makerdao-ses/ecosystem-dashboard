import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreadcrumbYearNavigation from './BreadcrumbYearNavigation';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof BreadcrumbYearNavigation> = {
  title: 'Fusion/Views/Finances/Section/BreadcrumbYearNavigation',
  component: BreadcrumbYearNavigation,

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
    years: ['2022', '2023'],
    handleChange: () => null,
    selectedValue: '2023',
    breakdownItems: [
      {
        label: 'Finances',
        href: '#',
      },
    ],
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(BreadcrumbYearNavigation, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22820:193423&mode=dev',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: 16,
            left: 16,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22977:248499&mode=dev',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:242472&mode=dev',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -1,
            left: -1,
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
