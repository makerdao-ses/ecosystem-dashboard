import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ExpenseReportStatus } from '../../../core/enums/expense-reports-status.enum';
import ExpenseReportStatusBtn from './expense-report-status-label';

export default {
  title: 'Components/AuditorComments/ExpenseReportStatus',
  component: ExpenseReportStatusBtn,
  argTypes: {
    variant: {
      defaultValue: ExpenseReportStatus.Draft,
      options: ExpenseReportStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ExpenseReportStatusBtn>;

const Template: ComponentStory<typeof ExpenseReportStatusBtn> = (args) => <ExpenseReportStatusBtn {...args} />;

export const Default = Template.bind({});
