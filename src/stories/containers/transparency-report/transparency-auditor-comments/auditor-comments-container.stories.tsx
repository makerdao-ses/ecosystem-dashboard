import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuditorCommentsContainer from './auditor-comments-container';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';

export default {
  title: 'Components/AuditorComments/AuditorCommentsContainer',
  component: AuditorCommentsContainer,
} as ComponentMeta<typeof AuditorCommentsContainer>;

const Template: ComponentStory<typeof AuditorCommentsContainer> = (args) => <AuditorCommentsContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: [
    {
      // eslint-disable-next-line spellcheck/spell-checker
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sit amet aliquam',
      id: '1',
      timestamp: '2022-11-28T16:03:24.130Z',
      authorId: '1',
      budgetStatementId: '1',
      status: BudgetStatus.Draft,
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  comments: [],
};
