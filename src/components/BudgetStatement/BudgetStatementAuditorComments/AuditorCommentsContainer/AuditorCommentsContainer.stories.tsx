import { CommentBuilder } from '@ses/core/businessLogic/builders/commentBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import { withGenericTeamContext } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AuditorCommentsContainer from './AuditorCommentsContainer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof AuditorCommentsContainer> = {
  title: 'Fusion/Components/Budget Statements/Comments/AuditorCommentsContainer',
  component: AuditorCommentsContainer,
  decorators: [withGenericTeamContext],
};
export default meta;

const args = [
  {
    comments: [
      new CommentBuilder()
        .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build())
        .withComment('lorem ipsum')
        .build(),
      new CommentBuilder()
        .withStatus(BudgetStatus.Review)
        .withAuthor(new UserBuilder().withUsername('story1').addCoreUnitFacilitatorRole().build())
        .build(),
      new CommentBuilder()
        .withStatus(BudgetStatus.Final)
        .withAuthor(new UserBuilder().withUsername('story2').addCoreUnitAuditorRole().build())
        .build(),
    ],
    resource: ResourceType.CoreUnit,
  },
];
const [[WithComments, DarkModeWithComments]] = createThemeModeVariants(AuditorCommentsContainer, args);
export { WithComments, DarkModeWithComments };

const [[EmptyLight, EmptyDark]] = createThemeModeVariants(AuditorCommentsContainer, [
  {
    comments: [],
    resource: ResourceType.CoreUnit,
  },
]);
export { EmptyLight, EmptyDark };
