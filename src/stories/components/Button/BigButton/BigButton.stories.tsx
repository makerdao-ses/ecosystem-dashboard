import React from 'react';
import BigButton from './BigButton';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/BigButton',
  component: BigButton,
} as ComponentMeta<typeof BigButton>;

const Template: ComponentStory<typeof BigButton> = (args) => <BigButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'See more related MIPs',
};

export const AllData = Template.bind({});
AllData.args = {
  title: 'Other text lager',
};
