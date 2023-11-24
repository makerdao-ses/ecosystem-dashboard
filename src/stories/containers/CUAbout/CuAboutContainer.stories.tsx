import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../AppLayout/AppLayout';
import CuAboutContainer from './CuAboutContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuAboutContainer> = {
  title: 'Pages/CU About',
  component: CuAboutContainer,
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
      viewports: [375, 834, 1194],
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
        <CuAboutContainer {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
