import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { BudgetStatus } from '../../../../../core/models/dto/coreUnitDTO';
import ExpenseReportStatus from './ExpenseReportStatus';
import type { ComponentMeta } from '@storybook/react';

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

Draft.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217',
  },
};

DraftDarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119468',
  },
};

Review.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119470',
  },
};

ReviewDarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103219',
  },
};

Escalated.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103223',
  },
};

EscalatedDarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119474',
  },
};

Final.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103221',
  },
};

FinalDarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119472',
  },
};
