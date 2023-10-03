import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import YearPicker from './YearPicker';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/YearPicker',
  component: YearPicker,
  parameters: {
    chromatic: {
      viewports: [375, 768],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof YearPicker>;

const variantsArgs = [
  {
    years: [2021, 2022, 2023],
    selectedYear: 2022,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(YearPicker, variantsArgs);
LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=15491:166084',
        options: {
          componentStyle: {
            width: 'fit-content',
          },
          style: {
            top: -3,
            left: 1,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:141259',
        options: {
          componentStyle: {
            width: 'fit-content',
          },
          style: {
            top: -4,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
