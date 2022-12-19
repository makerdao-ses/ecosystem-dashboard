import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoComments from './no-comments';

export default {
  title: 'Components/AuditorComments/NoComments',
  component: NoComments,
} as ComponentMeta<typeof NoComments>;

const Template: ComponentStory<typeof NoComments> = (args) => <NoComments {...args} />;

export const Default = Template.bind({});
