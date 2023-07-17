import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { withCoreUnitContext, withUserLoggedIn } from '@ses/core/utils/storybook/decorators';
import { CoreUnitsBuilder } from '../../../../../../core/businessLogic/builders/coreUnitsBuilder';
import { UserBuilder } from '../../../../../../core/businessLogic/builders/userBuilder';
import { createThemeModeVariants } from '../../../../../../core/utils/storybook/factories';
import CommentForm from './CommentForm';
import type { ComponentMeta } from '@storybook/react';

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
