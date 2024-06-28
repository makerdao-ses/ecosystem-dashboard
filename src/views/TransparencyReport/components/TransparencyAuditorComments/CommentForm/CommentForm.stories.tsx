import { CoreUnitsBuilder } from '@ses/core/businessLogic/builders/coreUnitsBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { withTeamContext, withUserLoggedIn } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CommentForm from './CommentForm';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Meta } from '@storybook/react';

const MockedAuditor = new UserBuilder().addCoreUnitAuditorRole().build();

const meta: Meta<typeof CommentForm> = {
  title: 'Components/AuditorComments/CommentForm',
  component: CommentForm,
  decorators: [
    withUserLoggedIn(MockedAuditor),
    withTeamContext(new CoreUnitsBuilder().withShortCode('EXA').addAuditors(MockedAuditor).build() as unknown as Team),
  ],
};
export default meta;

const [[Draft, DraftDarkMode], [Review, ReviewDarkMode], [Escalated, EscalatedDarkMode], [Final, FinalDarkMode]] =
  createThemeModeVariants(CommentForm, [
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
export { Draft, DraftDarkMode, Review, ReviewDarkMode, Escalated, EscalatedDarkMode, Final, FinalDarkMode };
