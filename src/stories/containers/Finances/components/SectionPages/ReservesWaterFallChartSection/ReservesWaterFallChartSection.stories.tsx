import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import ReservesWaterFallChartSection from './ReservesWaterFallChartSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ReservesWaterFallChartSection> = {
  title: 'Components/NewFinances/Section/ReservesWaterFallChartSection',
  component: ReservesWaterFallChartSection,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    title: 'MakerDAO Finances',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ReservesWaterFallChartSection, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:338005&mode=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331965&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335078&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335078&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:336608&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:333609&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  },
};
