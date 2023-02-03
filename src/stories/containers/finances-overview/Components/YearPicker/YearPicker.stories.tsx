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
    yearSelect: 2022,
  },
];

export const [[Picker, YearPickerDark]] = createThemeModeVariants(YearPicker, variantsArgs);
Picker.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A147675&t=utVlw3yjgH350GT2-4',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -5,
            left: -50,
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13451%3A150494&t=utVlw3yjgH350GT2-4',
        options: {
          componentStyle: {
            width: 834,
            display: 'flex',
            justifyContent: 'center',
          },
          style: {
            top: -4,
            left: 223,
          },
        },
      },
    },
  } as FigmaParams,
};

YearPickerDark.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13451%3A150493&t=utVlw3yjgH350GT2-4',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -5,
            left: -50,
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13451%3A150493&t=utVlw3yjgH350GT2-4',
        options: {
          componentStyle: {
            width: 834,
            display: 'flex',
            justifyContent: 'center',
          },
          style: {
            top: -4,
            left: 223,
          },
        },
      },
    },
  } as FigmaParams,
};
