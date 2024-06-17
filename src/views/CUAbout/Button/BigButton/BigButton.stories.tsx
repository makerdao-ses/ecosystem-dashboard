import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BigButton from './BigButton';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof BigButton> = {
  title: 'Fusion/CuAbout/BigButton',
  component: BigButton,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    title: 'See more related MIPs',
  },
  {
    title: 'Other text lager',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BigButton, variantsArgs);
export { LightMode, DarkMode };
