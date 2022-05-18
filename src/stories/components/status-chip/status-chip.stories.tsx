import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StatusChip } from './status-chip';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';

export default {
  title: 'Components/General/StatusChip',
  components: StatusChip,
} as ComponentMeta<typeof StatusChip>;

const Template: ComponentStory<typeof StatusChip> = (args) => <StatusChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: CuStatusEnum.Accepted,
};

export const FormalSubmission = Template.bind({});
FormalSubmission.args = {
  status: CuStatusEnum.FormalSubmission,
};
