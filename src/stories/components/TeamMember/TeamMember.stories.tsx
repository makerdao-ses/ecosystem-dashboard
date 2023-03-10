import React from 'react';
import TeamMember from './TeamMember';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUAbout/TeamMember',
  components: TeamMember,
} as ComponentMeta<typeof TeamMember>;

const Template: ComponentStory<typeof TeamMember> = (args) => <TeamMember {...args} />;

export const Default = Template.bind({});
Default.args = {
  ftes: 7.5,
};

export const Empty = Template.bind({});
Empty.args = {
  ftes: 1,
};
