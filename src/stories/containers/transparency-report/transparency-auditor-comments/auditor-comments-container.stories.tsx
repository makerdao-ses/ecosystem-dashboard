import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentsContainer from './auditor-comments-container';

export default {
  title: 'Components/AuditorComments/AuditorCommentsContainer',
  component: AuditorCommentsContainer,
} as ComponentMeta<typeof AuditorCommentsContainer>;

const Template: ComponentStory<typeof AuditorCommentsContainer> = (args) => <AuditorCommentsContainer {...args} />;

export const Default = Template.bind({});
