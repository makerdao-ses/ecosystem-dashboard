import React from 'react';
import TextInput from './text-input';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
