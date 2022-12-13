import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import InlineUser from './inline-user';

export default {
  title: 'Components/CUTransparencyReport/InlineUser',
  component: InlineUser,
  argTypes: {
    username: {
      defaultValue: 'Username',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof InlineUser>;

const Template: ComponentStory<typeof InlineUser> = (args) => <InlineUser {...args} />;

export const Default = Template.bind({});
