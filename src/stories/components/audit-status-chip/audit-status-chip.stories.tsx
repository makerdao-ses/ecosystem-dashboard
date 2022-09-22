import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AuditStatusChip } from './audit-status-chip';
import { AuditStatusEnum } from '../../../core/enums/audit-status.enum';

export default {
  title: 'Components/General/AuditStatusChip',
  component: AuditStatusChip,
} as ComponentMeta<typeof AuditStatusChip>;

const Template: ComponentStory<typeof AuditStatusChip> = (args) => <AuditStatusChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: AuditStatusEnum.Approved,
};
