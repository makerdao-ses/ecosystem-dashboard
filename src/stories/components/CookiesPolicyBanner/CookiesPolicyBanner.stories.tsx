import CookiesPolicyBanner from '@ses/components/CookiesPolicyBanner/CookiesPolicyBanner';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CookiesPolicyBanner> = {
  title: 'Components/General/CookiesPolicyBanner',
  component: CookiesPolicyBanner,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [1194, 375],
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],

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
};
export default meta;

const variantsArgs = [
  {
    functionalCheckbox: true,
    analyticsCheckbox: true,
  },
];

const [[Banner, BannerDarkMode]] = createThemeModeVariants(CookiesPolicyBanner, variantsArgs);
export { Banner, BannerDarkMode };

Banner.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119640&t=24E0CRrP3tj5hMo7-4',
        options: {
          style: {
            top: 23,
            left: 8,
          },
          componentStyle: {
            width: 375,
            height: 458,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9524%3A97525&t=24E0CRrP3tj5hMo7-4',
        options: {
          style: {
            top: '22px',
            left: '-10px',
            width: '100%',
            display: 'flex',
            flexGrow: 'row',
            justifyContent: 'center',
          },
        },
      },
    },
  },
};

BannerDarkMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12894%3A119640&t=24E0CRrP3tj5hMo7-4',
        options: {
          style: {
            top: 23,
            left: 8,
          },
          componentStyle: {
            width: 375,
            height: 458,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9838%3A102735&t=24E0CRrP3tj5hMo7-4',
        options: {
          style: {
            top: '22px',
            left: '-10px',
            width: '100%',
            display: 'flex',
            flexGrow: 'row',
            justifyContent: 'center',
          },
        },
      },
    },
  },
};
