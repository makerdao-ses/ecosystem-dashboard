import ExpenseReportStatus from './expense-report-status';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import type { ComponentMeta } from '@storybook/react';
import { createThemeModeVariants } from '../../../../../core/utils/storybook';

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

const variantsArgs = [
  { status: BudgetStatus.Draft },
  { status: BudgetStatus.Review },
  { status: BudgetStatus.Escalated },
  { status: BudgetStatus.Final },
];

export const [
  [Draft, DraftDarkMode],
  [Review, ReviewDarkMode],
  [Escalated, EscalatedDarkMode],
  [Final, FinalDarkMode],
] = createThemeModeVariants(ExpenseReportStatus, variantsArgs);
