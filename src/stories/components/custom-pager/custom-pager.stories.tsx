import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomPager } from './custom-pager';

export default {
  title: 'Components/General/CustomPager',
  component: CustomPager,
} as ComponentMeta<typeof CustomPager>;

const Template: ComponentStory<typeof CustomPager> = (args) => <CustomPager {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Custom pager',
};
