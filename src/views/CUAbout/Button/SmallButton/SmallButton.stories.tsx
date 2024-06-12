import React from 'react';
import SmallButton from './SmallButton';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/SmallButton',
  component: SmallButton,
} as ComponentMeta<typeof SmallButton>;

const Template: ComponentStory<typeof SmallButton> = (args) => <SmallButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Back',
};
export const BigText = Template.bind({});
Default.args = {
  title: 'Back to some place',
};
