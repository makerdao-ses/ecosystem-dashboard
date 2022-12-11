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
