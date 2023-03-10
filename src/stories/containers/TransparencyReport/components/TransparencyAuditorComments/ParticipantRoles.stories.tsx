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
    coreUnitCode: 'EXA',
    auditors: [],
    cu: [],
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
    coreUnitCode: 'EXA',
    auditors: [],
    cu: facilitators,
  },
]);

export const [[WithAuditorsOnly, WithAuditorsOnlyDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    coreUnitCode: 'EXA',
    auditors,
    cu: [],
  },
]);

export const [[WithAll, WithAllDarkMode]] = createThemeModeVariants(ParticipantRoles, [
  {
    coreUnitCode: 'EXA',
    auditors,
    cu: facilitators,
  },
]);
