import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentsContainer from './auditor-comments-container';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { CommentBuilder } from '../../../../../core/business-logic/builders/comment.builder';
import { UserBuilder } from '../../../../../core/business-logic/builders/user.builder';

export default {
  title: 'Components/AuditorComments/AuditorCommentsContainer',
  component: AuditorCommentsContainer,
} as ComponentMeta<typeof AuditorCommentsContainer>;

const Template: ComponentStory<typeof AuditorCommentsContainer> = (args) => <AuditorCommentsContainer {...args} />;

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

export const Empty = Template.bind({});
Empty.args = {
  comments: [],
};
