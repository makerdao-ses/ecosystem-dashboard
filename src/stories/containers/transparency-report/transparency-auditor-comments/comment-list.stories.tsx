import { withCoreUnitContext } from '@ses/core/utils/storybook/decorators';
import { CommentBuilder } from '../../../../core/business-logic/builders/commentBuilder';
import { UserBuilder } from '../../../../core/business-logic/builders/userBuilder';
import { BudgetStatus } from '../../../../core/models/dto/coreUnitDTO';
import { createThemeModeVariants } from '../../../../core/utils/storybook/factories';
import AuditorCommentList from './comment-list';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/AuditorCommentList',
  component: AuditorCommentList,
  decorators: [withCoreUnitContext],
} as ComponentMeta<typeof AuditorCommentList>;

const args = [
  {
    comments: [
      new CommentBuilder().withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build()).build(),
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

export const [[WithComments, WithCommentsDarkMode]] = createThemeModeVariants(AuditorCommentList, args);
