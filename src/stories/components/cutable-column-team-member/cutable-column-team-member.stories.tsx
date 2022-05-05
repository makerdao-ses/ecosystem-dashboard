import React from 'react';
import { CutableColumnTeamMember } from './cutable-column-team-member';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnTeamMember',
  components: CutableColumnTeamMember
} as ComponentMeta<typeof CutableColumnTeamMember>;

const Template: ComponentStory<typeof CutableColumnTeamMember> = (args) => <CutableColumnTeamMember {...args} />;

export const Default = Template.bind({});
Default.args = {
  fte: 4.5,
  members: [
    { name: 'John Doe' },
    { name: 'Billy Ferguson' },
    { name: 'Jackie Chang' },
  ]
};

export const Empty = Template.bind({});
Empty.args = {
  fte: 1,
  members: []
};
