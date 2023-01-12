import { CommentBuilder } from '../../../../../core/business-logic/builders/comment.builder';
import { UserBuilder } from '../../../../../core/business-logic/builders/user.builder';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { withCoreUnitContext, createThemeModeVariants } from '../../../../../core/utils/storybook';
import AuditorCommentsContainer from './auditor-comments-container';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/AuditorCommentsContainer',
  component: AuditorCommentsContainer,
  decorators: [withCoreUnitContext],
} as ComponentMeta<typeof AuditorCommentsContainer>;

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
  },
];
export const [[WithComments, DarkModeWithComments]] = createThemeModeVariants(AuditorCommentsContainer, args);

export const [[EmptyLight, EmptyDark]] = createThemeModeVariants(AuditorCommentsContainer, [
  {
    comments: [],
  },
]);
