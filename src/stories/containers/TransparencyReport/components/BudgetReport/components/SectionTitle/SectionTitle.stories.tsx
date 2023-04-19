import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import SectionTitle from './SectionTitle';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/Section Title',
  component: SectionTitle,
  argTypes: {
    // level
    hasIcon: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    hasExternalIcon: {
      defaultValue: undefined,
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof SectionTitle>;

const variantsArgs = [
  {
    level: 1,
    hasIcon: false,
    hasExternalIcon: true,
    children: 'Actuals - Totals',
  },
  {
    level: 2,
    hasIcon: true,
    hasExternalIcon: true,
    children: 'Permanent Team',
  },
];

export const [[L1WithoutIconLightMode, L1WithoutIconDarkMode], [L2FullLightMode, L2FullDarkMode]] =
  createThemeModeVariants(SectionTitle, variantsArgs);

L1WithoutIconLightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16948%3A288375&t=GWd1sRImP81dQTUt-4',
      },
    },
  } as FigmaParams,
};

L2FullLightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16948%3A288420&t=GWd1sRImP81dQTUt-4',
      },
    },
    options: {
      style: {
        top: -5,
        left: -5,
      },
    },
  } as FigmaParams,
};
