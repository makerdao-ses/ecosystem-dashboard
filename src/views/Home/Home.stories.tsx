import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import AppLayout from '@ses/containers/AppLayout/AppLayout';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import HomeView from './HomeView';
import { headerCardData } from './staticData';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HomeView> = {
  title: 'Fusion/Pages/Home',
  component: HomeView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    headerCard: {
      title: headerCardData.title,
      description: headerCardData.description,
      buttonTexts: headerCardData.buttonTexts,
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  () => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <HomeView />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

export { LightMode, DarkMode };
