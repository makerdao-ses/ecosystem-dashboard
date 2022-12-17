import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import ExpenseReportStatusIndicator, { ExpenseReportStatusIndicatorProps } from './expense-report-status-indicator';

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

export const Draft = Template.bind({});
Draft.args = {
  budgetStatus: BudgetStatus.Draft,
  showCTA: true,
} as ExpenseReportStatusIndicatorProps;

export const Review = Template.bind({});
Review.args = {
  budgetStatus: BudgetStatus.Review,
  showCTA: true,
} as ExpenseReportStatusIndicatorProps;

export const Escalated = Template.bind({});
Escalated.args = {
  budgetStatus: BudgetStatus.Escalated,
  showCTA: true,
} as ExpenseReportStatusIndicatorProps;

export const Final = Template.bind({});
Final.args = {
  budgetStatus: BudgetStatus.Final,
  showCTA: false,
} as ExpenseReportStatusIndicatorProps;
