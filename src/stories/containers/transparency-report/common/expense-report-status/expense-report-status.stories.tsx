import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ExpenseReportStatus from './expense-report-status';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';

export default {
  title: 'Components/AuditorComments/ExpenseReportStatus',
  component: ExpenseReportStatus,
  argTypes: {
    status: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ExpenseReportStatus>;

const Template: ComponentStory<typeof ExpenseReportStatus> = (args) => <ExpenseReportStatus {...args} />;

export const Default = Template.bind({});
