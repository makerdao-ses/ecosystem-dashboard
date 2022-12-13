import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import ExpenseReportStatusIndicator from './expense-report-status-indicator';

export default {
  title: 'Components/CUTransparencyReport/ExpenseReportStatusIndicator',
  component: ExpenseReportStatusIndicator,
  argTypes: {
    budgetStatus: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ExpenseReportStatusIndicator>;

const Template: ComponentStory<typeof ExpenseReportStatusIndicator> = (args) => (
  <ExpenseReportStatusIndicator {...args} />
);

export const Default = Template.bind({});
