import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { WalletTableCell } from './WalletTableCell';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/WalletTableCell',
  component: WalletTableCell,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
    },
  },
} as ComponentMeta<typeof WalletTableCell>;

const variantsArgs = [
  {
    wallet: '0x232b…8482',
    name: 'Permanent Team',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(WalletTableCell, variantsArgs, false);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16858%3A223564',
        options: {
          style: {
            top: 3,
            left: 16,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A274082',
        options: {
          style: {
            top: 2,
            left: -8,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16871%3A266076',
        options: {
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
