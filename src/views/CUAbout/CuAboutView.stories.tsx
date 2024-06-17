import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';

import CuAboutView from './CuAboutView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuAboutView> = {
  title: 'Fusion/Pages/CU_About',
  component: CuAboutView,
  decorators: [withoutSBPadding],

  parameters: {
    nextjs: {
      router: {
        path: '/core-unit/[code]',
        asPath: '/core-unit/SES',
        query: {
          code: 'SES',
        },
      },
    },
    chromatic: {
      viewports: [375, 768, 1024],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    cuAbout: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
    code: 'SES',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <CuAboutView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
