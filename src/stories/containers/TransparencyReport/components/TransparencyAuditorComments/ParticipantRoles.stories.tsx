import { ResourceType } from '@ses/core/models/interfaces/types';
import React from 'react';
import { UserBuilder } from '../../../../../core/businessLogic/builders/userBuilder';
import { createThemeModeVariants } from '../../../../../core/utils/storybook/factories';
import ParticipantRoles from './ParticipantRoles';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/ParticipantRoles',
  component: ParticipantRoles,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ParticipantRoles>;

export const [[Empty, EmptyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors: [],
    cu: [],
    resource: ResourceType.CoreUnit,
  },
]);

const auditors = [
  new UserBuilder().addCoreUnitFacilitatorRole().withUsername('auditor1').build(),
  new UserBuilder().addCoreUnitFacilitatorRole().withUsername('auditor2').build(),
];

const facilitators = [
  new UserBuilder().addCoreUnitFacilitatorRole().withUsername('facilitator1').build(),
  new UserBuilder().addCoreUnitFacilitatorRole().withUsername('facilitator2').build(),
];

export const [[WithFacilitatorsOnly, WithFacilitatorsOnlyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors: [],
    cu: facilitators,
    resource: ResourceType.CoreUnit,
  },
]);

export const [[WithAuditorsOnly, WithAuditorsOnlyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors,
    cu: [],
    resource: ResourceType.CoreUnit,
  },
]);

export const [[WithAll, WithAllDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors,
    cu: facilitators,
    resource: ResourceType.CoreUnit,
  },
]);
