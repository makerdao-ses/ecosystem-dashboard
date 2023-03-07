import React from 'react';
import { AuditStatusEnum } from '../../../core/enums/auditStatusEnum';
import { AuditStatusChip } from './AuditStatusChip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/AuditStatusChip',
  component: AuditStatusChip,
} as ComponentMeta<typeof AuditStatusChip>;

const Template: ComponentStory<typeof AuditStatusChip> = (args) => <AuditStatusChip {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: AuditStatusEnum.Approved,
};
