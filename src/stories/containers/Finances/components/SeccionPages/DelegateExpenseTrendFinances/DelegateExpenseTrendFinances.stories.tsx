import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseTrendFinances from './DelegateExpenseTrendFinances';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/Section/DelegateExpenseTrendFinances',
  component: DelegateExpenseTrendFinances,

  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof DelegateExpenseTrendFinances>;

const args = [{}];
export const [[LightMode, DarkMode]] = createThemeModeVariants(DelegateExpenseTrendFinances, args);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22751:179401&mode=dev',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22977:247838&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241811&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214488&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200750&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205050&mode=dev',
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

DarkMode.parameters = {};
