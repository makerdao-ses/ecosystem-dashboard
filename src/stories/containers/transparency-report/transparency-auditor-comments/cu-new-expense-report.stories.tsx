import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CUNewExpenseReport from './cu-new-expense-report';

export default {
  title: 'Components/AuditorComments/CUNewExpenseReport',
  component: CUNewExpenseReport,
  argTypes: {
    description: {
      defaultValue: 'Core Unit XXX has published a new expense report for MONTH YEAR',
      control: {
        type: 'text',
      },
    },
    date: {
      defaultValue: '2022-11-15T15:44:41.789Z',
      control: {
        type: 'date',
      },
    },
  },
} as ComponentMeta<typeof CUNewExpenseReport>;

const Template: ComponentStory<typeof CUNewExpenseReport> = (args) => <CUNewExpenseReport {...args} />;

export const Default = Template.bind({});
