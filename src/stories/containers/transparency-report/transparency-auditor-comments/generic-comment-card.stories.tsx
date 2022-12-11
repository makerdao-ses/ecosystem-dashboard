import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import GenericCommentCard from './generic-comment-card';

export default {
  title: 'Components/AuditorComments/GenericCommentCard',
  component: GenericCommentCard,
  argTypes: {
    variant: {
      defaultValue: BudgetStatus.Draft,
      options: BudgetStatus,
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof GenericCommentCard>;

const Template: ComponentStory<typeof GenericCommentCard> = (args) => (
  <GenericCommentCard {...args}>Children goes here</GenericCommentCard>
);

export const Default = Template.bind({});
