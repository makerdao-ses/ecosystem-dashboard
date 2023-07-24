import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import GenericCommentCard from './GenericCommentCard';
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
