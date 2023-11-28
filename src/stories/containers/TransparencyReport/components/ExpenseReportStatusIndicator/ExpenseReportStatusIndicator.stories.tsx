import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExpenseReportStatusIndicator from './ExpenseReportStatusIndicator';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExpenseReportStatusIndicator> = {
  title: 'Components/CUTransparencyReport/ExpenseReport StatusIndicator',
  component: ExpenseReportStatusIndicator,
  argTypes: {
    budgetStatus: {
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
};
export default meta;

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

const [[Draft, DraftDarkMode], [Review, ReviewDarkMode], [Escalated, EscalatedDarkMode], [Final, FinalDarkMode]] =
  createThemeModeVariants(ExpenseReportStatusIndicator, variantsArgs);
export { Draft, DraftDarkMode, Review, ReviewDarkMode, Escalated, EscalatedDarkMode, Final, FinalDarkMode };
