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
  members: [
    { name: 'John Doe' },
    { name: 'Billy Ferguson' },
    { name: 'Jackie Chang' },
    { name: 'Nicholas Tesla' },
    { name: 'Gustave Eiffel' },
    { name: 'Thomas Edison' },
  ]
};

export const Empty = Template.bind({});
Empty.args = {
  members: []
};
