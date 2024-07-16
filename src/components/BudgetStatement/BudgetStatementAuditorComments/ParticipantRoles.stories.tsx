import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import React from 'react';
import ParticipantRoles from './ParticipantRoles';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ParticipantRoles> = {
  title: 'Fusion/Components/Budget Statements/Comments/ParticipantRoles',
  component: ParticipantRoles,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

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

const [[WithFacilitatorsOnly, WithFacilitatorsOnlyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors: [],
    cu: facilitators,
    resource: ResourceType.CoreUnit,
  },
]);
export { WithFacilitatorsOnly, WithFacilitatorsOnlyDarkMode };

const [[WithAuditorsOnly, WithAuditorsOnlyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors,
    cu: [],
    resource: ResourceType.CoreUnit,
  },
]);
export { WithAuditorsOnly, WithAuditorsOnlyDarkMode };

const [[WithAll, WithAllDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    teamShortCode: 'EXA',
    auditors,
    cu: facilitators,
    resource: ResourceType.CoreUnit,
  },
]);
export { WithAll, WithAllDarkMode };
