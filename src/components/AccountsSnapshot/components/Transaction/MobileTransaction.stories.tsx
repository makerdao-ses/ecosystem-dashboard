import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MobileTransaction from './MobileTransaction';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof MobileTransaction> = {
  title: 'Fusion/Components/Accounts Snapshot/MobileTransaction',
  component: MobileTransaction,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
};
export default meta;

const commonArgs = {
  name: 'DSS Blow',
  date: '2023-04-17T11:36:54.494Z',
  txHash: '0xe079d59dbf813d2541a345ef4786cc44a8a',
  counterPartyName: 'Auditor Wallet',
  counterPartyAddress: '0x232b5483e5a5cd22188482',
  amount: 1153480,
};
const variantsArgs = [
  { ...commonArgs },
  {
    ...commonArgs,
    defaultExpanded: true,
  },
];

const [[CollapsedLightMode, CollapsedDarkMode], [ExpandedLightMode, ExpandedDarkMode]] = createThemeModeVariants(
  MobileTransaction,
  variantsArgs
);
export { CollapsedLightMode, CollapsedDarkMode, ExpandedLightMode, ExpandedDarkMode };

CollapsedLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1996-37244',
        options: {
          componentStyle: {
            width: 327,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

ExpandedLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1996-40628',
        options: {
          componentStyle: {
            width: 327,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
