import { CommentBuilder } from '../../../../core/business-logic/builders/comment.builder';
import { UserBuilder } from '../../../../core/business-logic/builders/user.builder';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import { withCoreUnitContext, createThemeModeVariants } from '../../../../core/utils/storybook';
import AuditorCommentCard from './auditor-comment-card';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/CommentCard',
  component: AuditorCommentCard,
  decorators: [withCoreUnitContext],
  argTypes: {
    status: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
    hasStatusChange: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    commentDescription: {
      defaultValue: undefined,
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof AuditorCommentCard>;

const variantsArgs = [
  {
    comment: new CommentBuilder().withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build()).build(),
  },
  {
    comment: new CommentBuilder()
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build())
      .withComment('Hello world\n\n**bold font:**\n- list item 1\n- list item 2')
      .build(),
  },
];

export const [[StatusChange, StatusChangeDarkMode], [Comment, DarkModeComment]] = createThemeModeVariants(
  AuditorCommentCard,
  variantsArgs
);
