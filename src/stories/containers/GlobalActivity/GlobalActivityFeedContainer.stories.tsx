import { ActivityBuilder } from '@ses/core/businessLogic/builders/activityBuilder';
import { CoreUnitsBuilder } from '@ses/core/businessLogic/builders/coreUnitsBuilder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import AppLayout from '../AppLayout/AppLayout';
import GlobalActivityFeedContainer from './GlobalActivityFeedContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof GlobalActivityFeedContainer> = {
  title: 'Pages/Global Activity Feed',
  component: GlobalActivityFeedContainer,
  decorators: [withoutSBPadding],

  parameters: {
    nextRouter: {
      pathname: '/activity-feed',
    },
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-global', '1662812570000')],
};
export default meta;

const variantsArgs = [
  {
    activityFeed: [],
    teams: [],
  },
  {
    activityFeed: [
      new ActivityBuilder()
        .withCreatedAt('2022-09-21T12:23:00Z')
        .withDescription(
          'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).'
        )
        .withParams({
          coreUnit: {
            shortCode: 'SES',
          },
          month: '2022-09',
        })
        .build(),
      new ActivityBuilder()
        .withCreatedAt('2022-09-10T12:23:00Z')
        .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
        .withParams({
          coreUnit: {
            shortCode: 'CES',
          },
          month: '2022-09',
        })
        .build(),
      new ActivityBuilder()
        .withCreatedAt('2022-08-20T12:23:00Z')
        .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
        .withParams({
          coreUnit: {
            shortCode: 'DUX',
          },
          month: '2022-08',
        })
        .build(),
    ],
    teams: [
      new CoreUnitsBuilder()
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png')
        .withShortCode('SES')
        .withName('Sustainable Ecosystem Scaling')

        .build(),
      new CoreUnitsBuilder()
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/dux-001/dux_logo.png')
        .withShortCode('DUX')
        .withName('Development & UX')
        .build(),
      new CoreUnitsBuilder()
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ces-001/ces_logo.png')
        .withShortCode('CES')
        .withName('Development & UX')
        .build(),
    ],
  },
];

const [[EmptyLightMode, EmptyDarkMode], [WithDataLightMode, WithDataDarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <GlobalActivityFeedContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { EmptyLightMode, EmptyDarkMode, WithDataLightMode, WithDataDarkMode };
