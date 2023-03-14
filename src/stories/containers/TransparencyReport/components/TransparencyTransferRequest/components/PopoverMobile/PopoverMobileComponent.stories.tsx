import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import PopoverMobileComponent from './PopoverMobileComponent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/PopoverMobileComponent',
  component: PopoverMobileComponent,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof PopoverMobileComponent>;

const variantsArgs = [
  {
    toolTipData: {
      description: '3 Months of Forecasts',
      mipNumber: 'MIP40c3-SP14:',
      link: '#',
    } as Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>,
    name: 'Collateral Engineering Services',
    longCode: 'SES-001',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(PopoverMobileComponent, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15293%3A163759&t=GfCJNnX1UcXL4afU-4',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -36,
            left: -42,
          },
        },
      },
    },
  },
};
