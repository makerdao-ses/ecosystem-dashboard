import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import BreadCrumb from './bread-crumb';

export default {
  title: 'Components/CUAbout/BreadCrumb',
  components: BreadCrumb
} as ComponentMeta<typeof BreadCrumb>;

const Template: ComponentStory<typeof BreadCrumb> = (args) => <BreadCrumb {...args} />;

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
