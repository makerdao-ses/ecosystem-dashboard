import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ParticipantRoles from './participant-roles';
import { UserBuilder } from '../../../../core/business-logic/builders/user.builder';

export default {
  title: 'Components/AuditorComments/ParticipantRoles',
  component: ParticipantRoles,
} as ComponentMeta<typeof ParticipantRoles>;

const Template: ComponentStory<typeof ParticipantRoles> = (args) => <ParticipantRoles {...args} />;

export const Default = Template.bind({});
Default.args = {
  auditors: [
    new UserBuilder().addCoreUnitAuditorRole().withUsername('auditor1').build(),
    new UserBuilder().addCoreUnitAuditorRole().withUsername('auditor2').build(),
  ],
  cu: [
    new UserBuilder().addCoreUnitFacilitatorRole().withUsername('facilitator1').build(),
    new UserBuilder().addCoreUnitFacilitatorRole().withUsername('facilitator1').build(),
  ],
};
