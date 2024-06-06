import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';

import CoreUnitsView from './CoreUnitsView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CoreUnitsView> = {
  title: 'Fusion/Pages/CoreUnits',
  component: CoreUnitsView,
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
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <CoreUnitsView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
