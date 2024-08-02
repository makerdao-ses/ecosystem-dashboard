import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import AppLayout from '@ses/containers/AppLayout/AppLayout';
import { FeatureFlagsProvider } from '@ses/core/context/FeatureFlagsProvider';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import HomeView from './HomeView';
import { headerCardData } from './staticData';
import type { HomeViewProps } from './HomeView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HomeView> = {
  title: 'Fusion/Pages/Home',
  component: HomeView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    headerCard: {
      title: headerCardData.title,
      description: headerCardData.description,
      buttonTexts: headerCardData.buttonTexts,
    },
    revenueAndSpendingData: {
      2021: {
        fees: 50000,
        liquidationIncome: 120000,
        psm: 30000,
        daiSpent: 70000,
        mkrVesting: 20000,
        annualProfit: 100000,
      },
      2022: {
        fees: 60000,
        liquidationIncome: 140000,
        psm: 35000,
        daiSpent: 80000,
        mkrVesting: 25000,
        annualProfit: 115000,
      },
      2023: {
        fees: 70000,
        liquidationIncome: 160000,
        psm: 40000,
        daiSpent: 90000,
        mkrVesting: 30000,
        annualProfit: 130000,
      },
      2024: {
        fees: 80000,
        liquidationIncome: 180000,
        psm: 45000,
        daiSpent: 100000,
        mkrVesting: 35000,
        annualProfit: 145000,
      },
    } as HomeViewProps['revenueAndSpendingData'],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (args: HomeViewProps) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <HomeView revenueAndSpendingData={args.revenueAndSpendingData} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs
);

export { LightMode, DarkMode };
