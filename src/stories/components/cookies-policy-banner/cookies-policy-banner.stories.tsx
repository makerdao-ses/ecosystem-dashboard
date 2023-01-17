import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

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

const Template: ComponentStory<typeof CookiesPolicyBanner> = (args) => <CookiesPolicyBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  functionalCheckbox: true,
  analyticsCheckbox: true,
  isLight: true,
};

Default.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9522%3A96615&t=d9UdVXKB5mStSiIv-0',
    {
      styles: {
        top: 400,
        left: 20,
      },
    }
  ),
];
