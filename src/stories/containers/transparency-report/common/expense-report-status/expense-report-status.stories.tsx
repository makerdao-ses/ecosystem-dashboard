import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import ExpenseReportStatus from './expense-report-status';
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

Draft.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];
DraftDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119468&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];

Review.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119470&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];
ReviewDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103219&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];

Escalated.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103223&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];
EscalatedDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119474&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];

Final.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103221&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];
FinalDarkMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10676%3A119472&t=rZgNKjWVAVo99Z9K-4',
    figmaComparatorCommonPaddingOptions
  ),
];
