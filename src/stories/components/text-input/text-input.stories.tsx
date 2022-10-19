import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextInput from './text-input';

export default {
  title: 'Components/General/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {};
