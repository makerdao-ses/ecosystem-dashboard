import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';
import TeamsView from './TeamsView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TeamsView> = {
  title: 'Fusion/Pages/Teams',
  component: TeamsView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <TeamsView {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
