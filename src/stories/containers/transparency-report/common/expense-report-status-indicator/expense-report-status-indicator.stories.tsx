import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExpenseReportStatusIndicator from './expense-report-status-indicator';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTransparencyReport/ExpenseReport StatusIndicator',
  component: ExpenseReportStatusIndicator,
  argTypes: {
    budgetStatus: {
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ExpenseReportStatusIndicator>;

const variantsArgs = [
  {
    budgetStatus: BudgetStatus.Draft,
    showCTA: true,
  },
  {
    budgetStatus: BudgetStatus.Review,
    showCTA: true,
  },
  {
    budgetStatus: BudgetStatus.Escalated,
    showCTA: true,
  },
  {
    budgetStatus: BudgetStatus.Final,
    showCTA: false,
  },
];

export const [
  [Draft, DraftDarkMode],
  [Review, ReviewDarkMode],
  [Escalated, EscalatedDarkMode],
  [Final, FinalDarkMode],
] = createThemeModeVariants(ExpenseReportStatusIndicator, variantsArgs);
