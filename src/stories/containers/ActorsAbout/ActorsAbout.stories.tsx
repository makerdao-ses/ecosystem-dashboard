import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../AppLayout/AppLayout';
import ActorAboutContainer from './ActorAboutContainer';
import actorsMockData from './ActorSummary/moment';
import type { ComponentMeta } from '@storybook/react';
export default {
  title: 'Pages/Actor About',
  component: ActorAboutContainer,
  decorators: [withoutSBPadding],
  parameters: {
    nextRouter: {
      path: '/ecosystem-actors/[code]',
      asPath: '/ecosystem-actors/DEWIZ-001',
      query: {
        code: 'DEWIZ-001',
      },
    },
    chromatic: {
      viewports: [834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ActorAboutContainer>;

const variantsArgs = [
  {
    actors: actorsMockData,
    actor: actorsMockData[0],
    code: 'DEWIZ-001',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <ActorAboutContainer {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

LightMode.parameters = {};

DarkMode.parameters = {};
