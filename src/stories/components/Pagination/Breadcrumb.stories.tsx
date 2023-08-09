import React from 'react';

import Breadcrumb from './Breadcrumb';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/Breadcrumb',
  components: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 10,
  isCoreUnit: true,
  breadcrumbs: ['Core Units', 'Strategic Initiatives', 'Finances', 'People'],
};
export const WithData = Template.bind({});
WithData.args = {
  count: 10,
  isCoreUnit: false,
  breadcrumbs: ['Strategic Initiatives', 'Finances', 'People'],
};
