import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import GenericCommentCard from './GenericCommentCard';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof GenericCommentCard> = {
  title: 'Components/AuditorComments/GenericCommentCard',
  component: GenericCommentCard,
  argTypes: {
    variant: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
};
export default meta;

const args = [
  { variant: BudgetStatus.Draft },
  { variant: BudgetStatus.Review },
  { variant: BudgetStatus.Escalated },
  { variant: BudgetStatus.Final },
];
const [[Draft, DraftDarkMode], [Review, ReviewDarkMode], [Escalated, EscalatedDarkMode], [Final, FinalDarkMode]] =
  createThemeModeVariants((props) => <GenericCommentCard {...props}>Lorem ipsum</GenericCommentCard>, args);
export { Draft, DraftDarkMode, Review, ReviewDarkMode, Escalated, EscalatedDarkMode, Final, FinalDarkMode };
