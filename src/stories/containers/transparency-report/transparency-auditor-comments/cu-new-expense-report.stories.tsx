import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CUNewExpenseReport from './cu-new-expense-report';

export default {
  title: 'Components/AuditorComments/CUNewExpenseReport',
  component: CUNewExpenseReport,
} as ComponentMeta<typeof CUNewExpenseReport>;

const Template: ComponentStory<typeof CUNewExpenseReport> = (args) => <CUNewExpenseReport {...args} />;

export const Default = Template.bind({});
