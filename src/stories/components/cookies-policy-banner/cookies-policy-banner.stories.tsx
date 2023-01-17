import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
// import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/CookiesPolicyBanner',
  component: CookiesPolicyBanner,
  parameters: {
    chromatic: {
      viewports: [1920 | 1440 | 1280 | 1194 | 834 | 0],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {
    handleAcceptCookies: {
      action: 'handleAcceptCookies',
    },
    handleRejectCookies: {
      action: 'handleRejectCookies',
    },
    setFunctionalCheckbox: {
      action: 'setFunctionalCheckbox',
    },
    setAnalyticsCheckbox: {
      action: 'setAnalyticsCheckbox',
    },
  },
} as ComponentMeta<typeof CookiesPolicyBanner>;

const variantsArgs = [
  {
    functionalCheckbox: true,
    analyticsCheckbox: true,
  },
];

export const [[Banner, BannerDarkMode]] = createThemeModeVariants(CookiesPolicyBanner, variantsArgs);

Banner.decorators = [
  withFigmaComparator({
    0: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A98025&t=MIuynuM3mpq7bvEM-4',
    834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97378&t=MIuynuM3mpq7bvEM-4',
    1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97359&t=MIuynuM3mpq7bvEM-4',
    1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97340&t=MIuynuM3mpq7bvEM-4',
    1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A92795&t=MIuynuM3mpq7bvEM-4',
    1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A94290&t=MIuynuM3mpq7bvEM-4',
  }),
];

BannerDarkMode.decorators = [
  withFigmaComparator({
    0: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A98025&t=MIuynuM3mpq7bvEM-4',
    834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97378&t=MIuynuM3mpq7bvEM-4',
    1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97359&t=MIuynuM3mpq7bvEM-4',
    1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A97340&t=MIuynuM3mpq7bvEM-4',
    1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A92795&t=MIuynuM3mpq7bvEM-4',
    1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A94290&t=MIuynuM3mpq7bvEM-4',
  }),
];

// Banner.decorators = [
//   withFigmaComparator(
//     'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9522%3A96615&t=d9UdVXKB5mStSiIv-0',
//     figmaComparatorCommonPaddingOptions
//   ),
// ];
// BannerDarkMode.decorators = [
//   withFigmaComparator(
//     'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9522%3A96615&t=d9UdVXKB5mStSiIv-0',
//     figmaComparatorCommonPaddingOptions
//   ),
// ];
