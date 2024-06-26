import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { ResourceType } from '@/core/models/interfaces/types';
import ItemFinancesSheet from './ItemFinancesSheet';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ItemFinancesSheet> = {
  title: 'Fusion/Views/Core Unit About/ItemFinancesSheet',
  component: ItemFinancesSheet,

  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    budgetPath: '',
    shortCode: 'SES',
    queryStrings: '',
    code: 'SES-001',
    type: ResourceType.CoreUnit,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ItemFinancesSheet, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1317:54650&t=FMD7BT51d5ZtPVvU-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  },
};
