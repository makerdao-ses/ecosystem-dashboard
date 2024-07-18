import { CoreUnitsBuilder } from '@ses/core/businessLogic/builders/coreUnitsBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { withTeamContext, withUserLoggedIn } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CommentForm from './CommentForm';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const MockedAuditor = new UserBuilder().addCoreUnitAuditorRole().build();

const meta: Meta<typeof CommentForm> = {
  title: 'Fusion/Components/Budget Statements/Comments/CommentForm',
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

Escalated.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3161-75034',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-58788',
        options: {
          componentStyle: {
            width: 461,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-55646',
        options: {
          componentStyle: {
            width: 714,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-53328',
        options: {
          componentStyle: {
            width: 892,
          },
        },
      },
    },
    options: {
      style: {
        top: -11,
        left: -14,
      },
    },
  } as FigmaParams,
};
