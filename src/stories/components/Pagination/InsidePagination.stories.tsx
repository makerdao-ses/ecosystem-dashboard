import React from 'react';

import InsidePagination from './InsidePagination';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/InsidePagination',
  components: InsidePagination,
} as ComponentMeta<typeof InsidePagination>;

const Template: ComponentStory<typeof InsidePagination> = (args) => <InsidePagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 3,
  page: 1,
};

export const BigTotal = Template.bind({});
BigTotal.args = {
  count: 100,
  page: 1,
};
