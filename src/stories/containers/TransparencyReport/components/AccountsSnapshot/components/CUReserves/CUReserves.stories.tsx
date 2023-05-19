import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CUReserves from './CUReserves';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/Accounts Snapshot/Core Unit Reserves',
  component: CUReserves,
} as ComponentMeta<typeof CUReserves>;

const variantsArgs = [
  {
    coreUnitCode: 'SES',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(CUReserves, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=18149%3A200168',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
