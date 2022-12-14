import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentCard from './auditor-comment-card';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';

export default {
  title: 'Components/AuditorComments/CommentCard',
  component: AuditorCommentCard,
  argTypes: {
    status: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
    hasStatusLabel: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    commentDescription: {
      defaultValue: undefined,
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof AuditorCommentCard>;

const Template: ComponentStory<typeof AuditorCommentCard> = (args) => <AuditorCommentCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  comment: {
    // eslint-disable-next-line spellcheck/spell-checker
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sit amet aliquam',
    id: '1',
    timestamp: '2022-11-28T16:03:24.130Z',
    author: {
      id: '1',
      username: 'test',
      name: 'Test',
      active: true,
      roles: undefined,
    },
    budgetStatementId: '1',
    status: BudgetStatus.Draft,
  },
};
