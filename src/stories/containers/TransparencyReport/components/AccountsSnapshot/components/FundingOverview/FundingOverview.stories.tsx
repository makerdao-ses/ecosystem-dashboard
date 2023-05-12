import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import FundingOverview from './FundingOverview';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/Accounts Snapshot/Funding Overview',
  component: FundingOverview,
} as ComponentMeta<typeof FundingOverview>;

const variantsArgs = [
  {
    coreUnitCode: 'SES',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(FundingOverview, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=18118%3A195773',
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
