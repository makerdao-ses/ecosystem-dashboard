import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnInitiatives } from './cu-table-column-initiatives';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnInitiatives',
  component: CuTableColumnInitiatives,
} as ComponentMeta<typeof CuTableColumnInitiatives>;

const args = [
  {
    initiatives: 1,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(CuTableColumnInitiatives, args);

LightMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2156%3A23054&t=Kn4jCXITHbiZO4YA-4',
    options: {
      style: {
        top: 5,
        left: -27,
      },
    },
  },
};

DarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2156%3A23054&t=Kn4jCXITHbiZO4YA-4',
    options: {
      style: {
        top: 5,
        left: -27,
      },
    },
  },
};
