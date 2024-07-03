import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import WalletInfo from './WalletInfo';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof WalletInfo> = {
  title: 'Fusion/Components/Accounts Snapshot/WalletInfo',
  component: WalletInfo,
};
export default meta;

const variantsArgs = [
  {
    name: 'Auditor',
    address: '0x232b567890123456789012345678901234568482',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(WalletInfo, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18675%3A213212',
        options: {
          componentStyle: {
            width: 212,
          },
          style: {
            top: -19,
            left: 0,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18595%3A253927',
        options: {
          componentStyle: {
            width: 175,
          },
          style: {
            top: -18,
            left: -16,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A236092',
        options: {
          componentStyle: {
            width: 212,
          },
          style: {
            top: -19,
            left: -16,
          },
        },
      },
    },
  } as FigmaParams,
};
