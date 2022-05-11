import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TeamMember from './team-member';

export default {
  title: 'Components/CUAbout/TeamMember',
  components: TeamMember,
} as ComponentMeta<typeof TeamMember>;

const Template: ComponentStory<typeof TeamMember> = (args) => <TeamMember {...args} />;

export const Default = Template.bind({});
Default.args = {
  fte: 7.5,
};

export const Empty = Template.bind({});
Empty.args = {
  fte: 1,
};
