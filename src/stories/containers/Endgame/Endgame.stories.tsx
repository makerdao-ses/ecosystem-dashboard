import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../AppLayout/AppLayout';
import EndgameContainer from './EndgameContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof EndgameContainer> = {
  title: 'Pages/Endgame',
  component: EndgameContainer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    budgetStructureAnalytics: {
      series: [
        {
          period: 'total',
          start: '2021-01-01T00:00:00.000Z',
          end: '2024-04-01T00:00:00.000Z',
          rows: [
            {
              dimensions: [
                {
                  name: 'budget',
                  path: 'atlas/legacy',
                },
              ],
              metric: 'Budget',
              value: 103289909.62499996,
            },
            {
              dimensions: [
                {
                  name: 'budget',
                  path: 'atlas/legacy',
                },
              ],
              metric: 'Actuals',
              value: 45807453.31000002,
            },
            {
              dimensions: [
                {
                  name: 'budget',
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 36306730.765775874,
            },
            {
              dimensions: [
                {
                  name: 'budget',
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Actuals',
              value: 2426116.26,
            },
          ],
        },
      ],
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <EndgameContainer {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
