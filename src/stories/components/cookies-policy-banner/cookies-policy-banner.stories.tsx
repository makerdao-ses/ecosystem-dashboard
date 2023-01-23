import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
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

Banner.parameters = {
  figma: {
    component: {
      0: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119658&t=feJZwRzZjZ2QfeYW-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119619&t=feJZwRzZjZ2QfeYW-4',
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119600&t=feJZwRzZjZ2QfeYW-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119581&t=feJZwRzZjZ2QfeYW-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119562&t=feJZwRzZjZ2QfeYW-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119543&t=feJZwRzZjZ2QfeYW-4',
    },
  },
};

BannerDarkMode.parameters = {
  figma: {
    component: {
      0: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119658&t=feJZwRzZjZ2QfeYW-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119619&t=feJZwRzZjZ2QfeYW-4',
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119600&t=feJZwRzZjZ2QfeYW-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119581&t=feJZwRzZjZ2QfeYW-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119562&t=feJZwRzZjZ2QfeYW-4',
      1920: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119543&t=feJZwRzZjZ2QfeYW-4',
    },
  },
};
