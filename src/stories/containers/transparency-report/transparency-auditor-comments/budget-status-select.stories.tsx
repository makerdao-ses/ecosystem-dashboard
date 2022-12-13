import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import BudgetStatusSelect from './budget-status-select';

export default {
  title: 'Components/AuditorComments/BudgetStatusSelect',
  component: BudgetStatusSelect,
  argTypes: {
    availableStatuses: {
      control: {
        type: 'inline-check',
        options: Object.values(BudgetStatus),
      },
    },
  },
} as ComponentMeta<typeof BudgetStatusSelect>;

const Template: ComponentStory<typeof BudgetStatusSelect> = (args) => (
  <div style={{ display: 'inline-block' }}>
    <BudgetStatusSelect {...args} />
  </div>
);

export const Default = Template.bind({});
