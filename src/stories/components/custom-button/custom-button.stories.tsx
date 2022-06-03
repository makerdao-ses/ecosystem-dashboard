import React from 'react';
import { CustomButton } from './custom-button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomButton',
  component: CustomButton
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => <CustomButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Custom button'
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled button',
  disabled: true
};
