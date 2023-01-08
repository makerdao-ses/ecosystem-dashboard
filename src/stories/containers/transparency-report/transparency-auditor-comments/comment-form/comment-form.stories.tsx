import { ComponentMeta } from '@storybook/react';
import CommentForm from './comment-form';
import { createThemeModeVariants, withCoreUnitContext, withUserLoggedIn } from '../../../../../core/utils/storybook';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { CoreUnitsBuilder } from '../../../../../core/business-logic/builders/core-units.builder';
import { UserBuilder } from '../../../../../core/business-logic/builders/user.builder';

const MockedAuditor = new UserBuilder().addCoreUnitAuditorRole().build();

export default {
  title: 'Components/AuditorComments/CommentForm',
  component: CommentForm,
  decorators: [
    withUserLoggedIn(MockedAuditor),
    withCoreUnitContext(new CoreUnitsBuilder().withShortCode('EXA').addAuditors(MockedAuditor).build()),
  ],
} as ComponentMeta<typeof CommentForm>;

export const [
  [Draft, DraftDarkMode],
  [Review, ReviewDarkMode],
  [Escalated, EscalatedDarkMode],
  [Final, FinalDarkMode],
] = createThemeModeVariants(CommentForm, [
  {},
  {
    currentBudgetStatus: BudgetStatus.Review,
  },
  {
    currentBudgetStatus: BudgetStatus.Escalated,
  },
  {
    currentBudgetStatus: BudgetStatus.Final,
  },
]);
