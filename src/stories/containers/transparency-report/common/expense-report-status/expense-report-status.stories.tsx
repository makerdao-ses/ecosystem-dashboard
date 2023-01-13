import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { createTemplateWithTheme, withFigmaComparator } from '../../../../../core/utils/storybook';
import ExpenseReportStatus from './expense-report-status';
import type { ComponentMeta } from '@storybook/react';

const FILE_ID = 'pyaYEjcwF2b5uf9y0vIfIy';

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

const LightModeTemplate = createTemplateWithTheme(ExpenseReportStatus, true);
const DarkModeTemplate = createTemplateWithTheme(ExpenseReportStatus, false);

// Draft status
export const Draft = LightModeTemplate.bind({});
Draft.args = {
  _hasFigma: true,
};
Draft.decorators = [withFigmaComparator(FILE_ID, '10486:103217')];

export const DraftDarkMode = DarkModeTemplate.bind({});
DraftDarkMode.decorators = [withFigmaComparator(FILE_ID, '10676:119468')];

// Review status
export const Review = LightModeTemplate.bind({});
Review.args = {
  status: BudgetStatus.Review,
};
Review.decorators = [withFigmaComparator(FILE_ID, '10486:103219')];

export const ReviewDarkMode = DarkModeTemplate.bind({});
ReviewDarkMode.args = {
  status: BudgetStatus.Review,
};
ReviewDarkMode.decorators = [withFigmaComparator(FILE_ID, '10676:119470')];

// Escalated status
export const Escalated = LightModeTemplate.bind({});
Escalated.args = {
  status: BudgetStatus.Escalated,
};
Escalated.decorators = [withFigmaComparator(FILE_ID, '10486:103223')];

export const EscalatedDarkMode = DarkModeTemplate.bind({});
EscalatedDarkMode.args = {
  status: BudgetStatus.Escalated,
};
EscalatedDarkMode.decorators = [withFigmaComparator(FILE_ID, '10676:119474')];

// Final status
export const Final = LightModeTemplate.bind({});
Final.args = {
  status: BudgetStatus.Final,
};
Final.decorators = [withFigmaComparator(FILE_ID, '10486:103221')];

export const FinalDarkMode = DarkModeTemplate.bind({});
FinalDarkMode.args = {
  status: BudgetStatus.Final,
};
FinalDarkMode.decorators = [withFigmaComparator(FILE_ID, '10676:119472')];
