import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ItemCustomProject from './ItemCustomProject';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ItemCustomProject> = {
  title: 'Fusion/Views/Ecosystem Actor About/ItemCustomProject',
  component: ItemCustomProject,

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
    shortCode: 'Powerhouse',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ItemCustomProject, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1317:53357&t=OVqwgbDObxaThSlv-4',
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
