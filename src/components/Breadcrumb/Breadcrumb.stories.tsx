import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import Breadcrumb from './Breadcrumb';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Fusion/Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightModeDefault, DarkModeDefault]] = createThemeModeVariants(Breadcrumb, variantsArgs, false);
export { LightModeDefault, DarkModeDefault };
