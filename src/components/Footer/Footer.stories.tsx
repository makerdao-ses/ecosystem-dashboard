import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Footer from './Footer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  title: 'Fusion/Footer',
  component: Footer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [1440], // when responsive is done [1440, 1280, 1024, 768, 375]
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const [[LightMode, DarkMode]] = createThemeModeVariants(Footer, undefined, false);
export { LightMode, DarkMode };
