import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withLocalStorageItem } from '@ses/core/utils/storybook/loaders';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import { featureFlags } from 'feature-flags/feature-flags';
import AppLayout from '../AppLayout/AppLayout';
import { TransparencyReport } from './TransparencyReportView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TransparencyReport> = {
  title: 'Pages/CU Transparency Report',
  component: TransparencyReport,
  decorators: [withoutSBPadding],

  parameters: {
    nextjs: {
      router: {
        path: '/core-unit/[code]/finances/reports',
        asPath: '/core-unit/SES/finances/reports',
        query: {
          code: 'SES',
        },
      },
    },
    chromatic: {
      viewports: [375, 768, 1024],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-09-22T12:23:00Z'),
  },
  loaders: [withLocalStorageItem('activity-visit-SES', '1662812570000')],
};
export default meta;

const variantsArgs = [
  // actuals
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // actuals without data (empty)
  {
    coreUnit: {
      ...SESCoreUnitMocked,
      budgetStatements: [],
    },
    coreUnits: [SESCoreUnitMocked],
  },
  // forecast
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // mkr vesting
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // transfer requests
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
  // expense report
  {
    coreUnit: SESCoreUnitMocked,
    coreUnits: [SESCoreUnitMocked],
  },
];

const [
  [ActualsWithDataLightMode, ActualsWithDataDarkMode],
  [ActualsWithoutDataLightMode, ActualsWithoutDataDarkMode],
  [ForecastTabLightMode, ForecastTabDarkMode],
  [MKRVestingLightMode, MKRVestingDarkMode],
  [TransferRequestsLightMode, TransferRequestsDarkMode],
  [ExpenseReportLightMode, ExpenseReportDarkMode],
] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <TransparencyReport {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs,
  false
);
export {
  ActualsWithDataLightMode,
  ActualsWithDataDarkMode,
  ActualsWithoutDataLightMode,
  ActualsWithoutDataDarkMode,
  ForecastTabLightMode,
  ForecastTabDarkMode,
  MKRVestingLightMode,
  MKRVestingDarkMode,
  TransferRequestsLightMode,
  TransferRequestsDarkMode,
  ExpenseReportLightMode,
  ExpenseReportDarkMode,
};

const forecastParams = {
  nextjs: {
    router: {
      path: '/core-unit/[code]/finances/reports?section=forecast',
      asPath: '/core-unit/SES/finances/reports?section=forecast',
      query: {
        section: 'forecast',
      },
    },
  },
};
ForecastTabLightMode.parameters = forecastParams;
ForecastTabDarkMode.parameters = forecastParams;

const mkrVestingParams = {
  nextjs: {
    router: {
      path: '/core-unit/[code]/finances/reports?section=mkr-vesting',
      asPath: '/core-unit/SES/finances/reports?section=mkr-vesting',
      query: {
        section: 'mkr-vesting',
      },
    },
  },
};
MKRVestingLightMode.parameters = mkrVestingParams;
MKRVestingDarkMode.parameters = mkrVestingParams;

const transferRequestsParams = {
  nextjs: {
    router: {
      path: '/core-unit/[code]/finances/reports?section=transfer-requests',
      asPath: '/core-unit/SES/finances/reports?section=transfer-requests',
      query: {
        section: 'transfer-requests',
      },
    },
  },
};
TransferRequestsLightMode.parameters = transferRequestsParams;
TransferRequestsDarkMode.parameters = transferRequestsParams;

const expenseReportParams = {
  nextjs: {
    router: {
      path: '/core-unit/[code]/finances/reports?view=auditor&section=budget-report',
      asPath: '/core-unit/SES/finances/reports?view=auditor&section=budget-report',
      query: {
        view: 'auditor',
        section: 'budget-report',
      },
    },
  },
};
ExpenseReportLightMode.parameters = expenseReportParams;
ExpenseReportDarkMode.parameters = expenseReportParams;
