import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import YearPicker from './YearPicker';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof YearPicker> = {
  title: 'Components/Finances/YearPicker',
  component: YearPicker,
  parameters: {
    chromatic: {
      viewports: [375, 768],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    years: [2021, 2022, 2023],
    selectedYear: 2022,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(YearPicker, variantsArgs);
export { LightMode, DarkMode };

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
