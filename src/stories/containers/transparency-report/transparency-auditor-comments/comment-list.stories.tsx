import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentList from './comment-list';

export default {
  title: 'Components/AuditorComments/AuditorCommentList',
  component: AuditorCommentList,
} as ComponentMeta<typeof AuditorCommentList>;

const Template: ComponentStory<typeof AuditorCommentList> = (args) => <AuditorCommentList {...args} />;

export const Default = Template.bind({});
