import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ParticipantRoles from './participant-roles';

export default {
  title: 'Components/AuditorComments/ParticipantRoles',
  component: ParticipantRoles,
} as ComponentMeta<typeof ParticipantRoles>;

const Template: ComponentStory<typeof ParticipantRoles> = (args) => <ParticipantRoles {...args} />;

export const Default = Template.bind({});
