import CheckBox from '@ses/components/check-box/check-box';
import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
export default {
  title: 'Components/General/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Checked = Template.bind({});
export const UnChecked = Template.bind({});
Checked.args = {
  isChecked: true,
  label: 'Check',
  isLight: true,
};
UnChecked.args = {
  isChecked: true,
  label: 'UnChecked',
  isLight: false,
};
