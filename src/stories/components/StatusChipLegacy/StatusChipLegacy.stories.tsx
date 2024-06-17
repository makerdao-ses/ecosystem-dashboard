import React from 'react';
import { TeamStatus } from '@/core/models/interfaces/types';
import { StatusChipLegacy } from './StatusChipLegacy';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/StatusChipLegacy',
  components: StatusChipLegacy,
} as ComponentMeta<typeof StatusChipLegacy>;

const Template: ComponentStory<typeof StatusChipLegacy> = (args) => <StatusChipLegacy {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: TeamStatus.Accepted,
};

export const FormalSubmission = Template.bind({});
FormalSubmission.args = {
  status: TeamStatus.FormalSubmission,
};
