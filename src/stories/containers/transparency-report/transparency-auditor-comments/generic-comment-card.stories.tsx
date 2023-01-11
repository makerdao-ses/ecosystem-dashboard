import { ComponentMeta } from '@storybook/react';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import GenericCommentCard from './generic-comment-card';
import { createThemeModeVariants } from '../../../../core/utils/storybook';

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
