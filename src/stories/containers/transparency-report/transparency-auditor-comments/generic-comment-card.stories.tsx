import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import { createThemeModeVariants } from '../../../../core/utils/storybook/factories';
import GenericCommentCard from './generic-comment-card';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/GenericCommentCard',
  component: GenericCommentCard,
  argTypes: {
    variant: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof GenericCommentCard>;

const args = [
  { variant: BudgetStatus.Draft },
  { variant: BudgetStatus.Review },
  { variant: BudgetStatus.Escalated },
  { variant: BudgetStatus.Final },
];
export const [
  [Draft, DraftDarkMode],
  [Review, ReviewDarkMode],
  [Escalated, EscalatedDarkMode],
  [Final, FinalDarkMode],
] = createThemeModeVariants((props) => <GenericCommentCard {...props}>Lorem ipsum</GenericCommentCard>, args);
