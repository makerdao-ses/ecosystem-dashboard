import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { WalletTableCell } from './WalletTableCell';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof WalletTableCell> = {
  title: 'Fusion/Components/Budget Statements/WalletTableCell',
  component: WalletTableCell,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    address: '0x232b779ce300024ed58692b6c007e312584f8482',
    wallet: '0x232b…8482',
    name: 'Permanent Team',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(WalletTableCell, variantsArgs, false);
export { LightMode, DarkMode };

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
