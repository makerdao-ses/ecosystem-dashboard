import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';
import EndgameView from './EndgameView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof EndgameView> = {
  title: 'Fusion/Pages/Endgame',
  component: EndgameView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    budgetTransitionAnalytics: {
      series: [
        {
          end: '2021-04-01T00:00:00.000Z',
          start: '2021-01-01T00:00:00.000Z',
          period: '2021/Q1',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2021-07-01T00:00:00.000Z',
          start: '2021-04-01T00:00:00.001Z',
          period: '2021/Q2',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2021-10-01T00:00:00.000Z',
          start: '2021-07-01T00:00:00.001Z',
          period: '2021/Q3',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2022-01-01T00:00:00.000Z',
          start: '2021-10-01T00:00:00.001Z',
          period: '2021/Q4',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2022-04-01T00:00:00.000Z',
          start: '2022-01-01T00:00:00.000Z',
          period: '2022/Q1',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2022-07-01T00:00:00.000Z',
          start: '2022-04-01T00:00:00.001Z',
          period: '2022/Q2',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2022-10-01T00:00:00.000Z',
          start: '2022-07-01T00:00:00.001Z',
          period: '2022/Q3',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2023-01-01T00:00:00.000Z',
          start: '2022-10-01T00:00:00.001Z',
          period: '2022/Q4',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2023-04-01T00:00:00.000Z',
          start: '2023-01-01T00:00:00.000Z',
          period: '2023/Q1',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2023-07-01T00:00:00.000Z',
          start: '2023-04-01T00:00:00.001Z',
          period: '2023/Q2',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2023-10-01T00:00:00.000Z',
          start: '2023-07-01T00:00:00.001Z',
          period: '2023/Q3',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2024-01-01T00:00:00.000Z',
          start: '2023-10-01T00:00:00.001Z',
          period: '2023/Q4',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2024-04-01T00:00:00.000Z',
          start: '2024-01-01T00:00:00.000Z',
          period: '2024/Q1',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
        {
          end: '2024-07-01T00:00:00.000Z',
          start: '2024-04-01T00:00:00.001Z',
          period: '2024/Q2',
          rows: [
            {
              dimensions: [
                {
                  name: 'Budget',
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
                  path: 'atlas/scopes',
                },
              ],
              metric: 'Budget',
              value: 45807453.31000002,
            },
          ],
        },
      ],
      yearsRange: [2021, 2024],
      initialYear: 2021,
    },
    yearsRange: [2021, 2024],
    initialYear: 2021,
  },
];
//
const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <EndgameView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
