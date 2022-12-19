import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentList from './comment-list';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import { CommentBuilder } from '../../../../core/business-logic/builders/comment.builder';
import { UserBuilder } from '../../../../core/business-logic/builders/user.builder';

export default {
  title: 'Components/AuditorComments/AuditorCommentList',
  component: AuditorCommentList,
} as ComponentMeta<typeof AuditorCommentList>;

const Template: ComponentStory<typeof AuditorCommentList> = (args) => <AuditorCommentList {...args} />;

export const Default = Template.bind({});
Default.args = {
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
};
