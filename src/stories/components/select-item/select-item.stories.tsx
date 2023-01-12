import React from 'react';
import { SelectItem } from './select-item';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/SelectItem',
  component: SelectItem,
} as ComponentMeta<typeof SelectItem>;

const Template: ComponentStory<typeof SelectItem> = (args) => <SelectItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'some label',
  count: 4,
};
