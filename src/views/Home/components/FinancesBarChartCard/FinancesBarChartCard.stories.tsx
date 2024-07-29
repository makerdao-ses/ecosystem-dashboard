import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { financesBarChartCardData } from '@/views/Home/staticData';
import FinancesBarChartCard from './FinancesBarChartCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FinancesBarChartCard> = {
  title: 'Fusion/Views/Home/FinancesBarChartCard',
  component: FinancesBarChartCard,
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
    financesBarChartCard: {
      title: financesBarChartCardData.title,
      annualProfitLegendAsteriskText: financesBarChartCardData.annualProfitLegendAsteriskText,
      annualProfitLegendTitle: financesBarChartCardData.annualProfitLegendTitle,
      revenueLegendTitle: financesBarChartCardData.revenueLegendTitle,
      revenueLegendButtonTexts: financesBarChartCardData.revenueLegendButtonTexts,
      spendingLegendTitle: financesBarChartCardData.spendingLegendTitle,
      spendingLegendButtonTexts: financesBarChartCardData.spendingLegendButtonTexts,
      makerburnLinkText: financesBarChartCardData.makerburnLinkText,
      detailsLinkText: financesBarChartCardData.detailsLinkText,
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(FinancesBarChartCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-39736&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-37894&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-35734&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-33287&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=28-8216&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
    },
  } as FigmaParams,
};
