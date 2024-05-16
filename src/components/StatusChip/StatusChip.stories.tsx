import { CuMipStatus } from '@ses/core/models/interfaces/types';
import React from 'react';
import { StatusChip } from './StatusChip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/StatusChip',
  components: StatusChip,
} as ComponentMeta<typeof StatusChip>;

const Template: ComponentStory<typeof StatusChip> = (args) => <StatusChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: CuMipStatus.Accepted,
};

export const FormalSubmission = Template.bind({});
FormalSubmission.args = {
  status: CuMipStatus.FormalSubmission,
};
