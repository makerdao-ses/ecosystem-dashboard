import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import TopBarNavigation from './TopBarNavigation';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TopBarNavigation> = {
  title: 'Fusion/Components/TopBarNavigation',
  component: TopBarNavigation,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  TopBarNavigation,

  variantsArgs
);
export { LightMode, DarkMode };
