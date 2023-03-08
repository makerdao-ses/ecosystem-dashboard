import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import YearPicker from './YearPicker';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Finances/YearPicker',
  component: YearPicker,
  chromatic: {
    viewports: [375, 834],
    pauseAnimationAtEnd: true,
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147675',
        options: {
          componentStyle: {
            width: 'fit-content',
          },
          style: {
            top: -3,
            left: -99,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13451%3A150494',
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
