import { ActivityBuilder } from '@ses/core/business-logic/builders/activity.builder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import AppLayout from '../layout/layout';
import CUActivityFeedContainer from './cu-activity';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/CU Activity Feed',
  component: CUActivityFeedContainer,
  decorators: [withoutSBPadding],
  chromatic: {
    viewports: [375, 834, 1194],
    pauseAnimationAtEnd: true,
  },
  parameters: {
    nextRouter: {
      path: '/core-unit/[code]/activity-feed',
      asPath: '/core-unit/SES/activity-feed',
      query: {
        code: 'SES',
      },
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-SES', '1662812570000')],
} as ComponentMeta<typeof CUActivityFeedContainer>;

const variantsArgs = [
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  {
    coreUnit: {
      ...SESCoreUnitMocked,
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
              shortCode: 'SES',
            },
            month: '2022-09',
          })
          .build(),
        new ActivityBuilder()
          .withCreatedAt('2022-08-20T12:23:00Z')
          .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
          .withParams({
            coreUnit: {
              shortCode: 'SES',
            },
            month: '2022-08',
          })
          .build(),
      ],
    },
    coreUnits: [SESCoreUnitMocked],
  },
];

export const [[EmptyLightMode, EmptyDarkMode], [WithDataLightMode, WithDataDarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <CUActivityFeedContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
