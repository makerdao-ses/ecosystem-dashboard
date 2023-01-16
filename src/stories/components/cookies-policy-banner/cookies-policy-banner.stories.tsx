import CookiesPolicyBanner from '@ses/components/cookies-policy-banner/cookies-policy-banner';
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
Default.parameters = {
  layout: 'center',
};
Default.args = {
  functionalCheckbox: true,
  analyticsCheckbox: true,
  isLight: true,
};
