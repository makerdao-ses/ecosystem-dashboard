import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/CookiesPolicyBanner',
  component: CookiesPolicyBanner,
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
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12772%3A119484&t=DuHq7VVvAjRQNGSH-4',
    {
      styles: {
        top: 400,
        left: 20,
      },
    }
  ),
];
BannerDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12772%3A119484&t=DuHq7VVvAjRQNGSH-4',
    {
      styles: {
        top: 400,
        left: 20,
      },
    }
  ),
];
