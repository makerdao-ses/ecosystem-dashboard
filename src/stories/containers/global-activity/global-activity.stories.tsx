import { ActivityBuilder } from '@ses/core/business-logic/builders/activity.builder';
import { CoreUnitsBuilder } from '@ses/core/business-logic/builders/core-units.builder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import AppLayout from '../layout/layout';
import GlobalActivityFeedContainer from './global-activity';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/Global Activity Feed',
  component: GlobalActivityFeedContainer,
  decorators: [withoutSBPadding],
  chromatic: {
    viewports: [375, 834, 1194],
    pauseAnimationAtEnd: true,
  },
  parameters: {
    nextRouter: {
      pathname: '/activity-feed',
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-global', '1662812570000')],
} as ComponentMeta<typeof GlobalActivityFeedContainer>;

const variantsArgs = [
  {
    coreUnits: [],
  },
  {
    coreUnits: [
      new CoreUnitsBuilder()
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png')
        .withShortCode('SES')
        .withName('Sustainable Ecosystem Scaling')
        .addActivity(
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
            .build()
        )
        .addActivity(
          new ActivityBuilder()
            .withCreatedAt('2022-09-10T12:23:00Z')
            .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
            .withParams({
              coreUnit: {
                shortCode: 'SES',
              },
              month: '2022-09',
            })
            .build()
        )
        .build(),
      new CoreUnitsBuilder()
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/dux-001/dux_logo.png')
        .withShortCode('DUX')
        .withName('Development & UX')
        .addActivity(
          new ActivityBuilder()
            .withCreatedAt('2022-08-20T12:23:00Z')
            .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
            .withParams({
              coreUnit: {
                shortCode: 'DUX',
              },
              month: '2022-08',
            })
            .build()
        )
        .build(),
    ],
  },
];

export const [[EmptyLightMode, EmptyDarkMode], [WithDataLightMode, WithDataDarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <GlobalActivityFeedContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
