import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentCard from './auditor-comment-card';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import { CommentBuilder } from '../../../../core/business-logic/builders/comment.builder';
import { UserBuilder } from '../../../../core/business-logic/builders/user.builder';

export default {
  title: 'Components/AuditorComments/CommentCard',
  component: AuditorCommentCard,
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

type ExtraArgs = {
  status: BudgetStatus;
  commentDescription: string;
};

const Template: ComponentStory<typeof AuditorCommentCard> = ({ comment, hasStatusChange, verb, ...rest }) => {
  const { status, commentDescription } = rest as ExtraArgs;
  const updatedComment = {
    ...comment,
    comment: commentDescription || comment.comment,
    status: status || comment.status,
  };

  return <AuditorCommentCard comment={updatedComment} hasStatusChange={hasStatusChange} verb={verb} />;
};

export const Default = Template.bind({});
Default.args = {
  comment: new CommentBuilder().withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build()).build(),
  hasStatusChange: true,
};

export const Comment = Template.bind({});
Comment.args = {
  comment: new CommentBuilder()
    .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build())
    .withComment('Hello world\n\n**bold font:**\n- list item 1\n- list item 2')
    .build(),
  hasStatusChange: false,
};
