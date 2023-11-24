import { ActivityBuilder } from '@ses/core/businessLogic/builders/activityBuilder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import AppLayout from '../AppLayout/AppLayout';
import CUActivityFeedContainer from './CUActivityFeedContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CUActivityFeedContainer> = {
  title: 'Pages/CU Activity Feed',
  component: CUActivityFeedContainer,
  decorators: [withoutSBPadding],

  parameters: {
    nextjs: {
      router: {
        path: '/core-unit/[code]/activity-feed',
        asPath: '/core-unit/SES/activity-feed',
        query: {
          code: 'SES',
        },
      },
    },
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-SES', '1662812570000')],
};
export default meta;

const variantsArgs = [
  {
    activities: [],
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  {
    activities: [
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
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
];

const [[EmptyLightMode, EmptyDarkMode], [WithDataLightMode, WithDataDarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <CUActivityFeedContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { EmptyLightMode, EmptyDarkMode, WithDataLightMode, WithDataDarkMode };
