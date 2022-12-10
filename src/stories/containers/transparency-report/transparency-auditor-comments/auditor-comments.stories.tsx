import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentCard from './auditor-comment-card';
import { ExpenseReportStatus } from '../../../../core/enums/expense-reports-status.enum';

export default {
  title: 'Components/AuditorComments/CommentCard',
  component: AuditorCommentCard,
  argTypes: {
    variant: {
      defaultValue: ExpenseReportStatus.Draft,
      options: ExpenseReportStatus,
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
