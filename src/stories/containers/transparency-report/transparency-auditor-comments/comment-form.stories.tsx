import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CommentForm from './comment-form';

export default {
  title: 'Components/AuditorComments/CommentForm',
  component: CommentForm,
} as ComponentMeta<typeof CommentForm>;

const Template: ComponentStory<typeof CommentForm> = (args) => <CommentForm {...args} />;

export const Default = Template.bind({});
