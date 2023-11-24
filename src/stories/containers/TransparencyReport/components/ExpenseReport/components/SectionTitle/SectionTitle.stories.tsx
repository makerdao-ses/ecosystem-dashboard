import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import SectionTitle from './SectionTitle';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/CUTransparencyReport/Section Title',
  component: SectionTitle,
  argTypes: {
    hasIcon: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    hasExternalIcon: {
      defaultValue: undefined,
      control: { type: 'text' },
    },
  },
};
export default meta;

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

const [[L1WithoutIconLightMode, L1WithoutIconDarkMode], [L2FullLightMode, L2FullDarkMode]] = createThemeModeVariants(
  SectionTitle,
  variantsArgs
);
export { L1WithoutIconLightMode, L1WithoutIconDarkMode, L2FullLightMode, L2FullDarkMode };

L1WithoutIconLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16858%3A223537',
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A274076',
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A266070',
      },
    },
  } as FigmaParams,
};

L2FullLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16858%3A223630',
        options: {
          style: {
            top: 0,
            left: -3,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A274413',
        options: {
          style: {
            top: -5,
            left: -7,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A266115',
        options: {
          style: {
            top: -5,
            left: -7,
          },
        },
      },
    },
  } as FigmaParams,
};
