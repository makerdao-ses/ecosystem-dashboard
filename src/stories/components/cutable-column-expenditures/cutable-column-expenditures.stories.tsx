import React from 'react';
import { CutableColumnExpenditures } from './cutable-column-expenditures';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CutableColumnExpenditures
} as ComponentMeta<typeof CutableColumnExpenditures>;

const Template: ComponentStory<typeof CutableColumnExpenditures> = (args) => <CutableColumnExpenditures {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 16500,
  percent: 120,
  items: [{ value: 45 }, { value: 76 }, { value: 91 }, { value: 120 }],
  budgetCap: 100,
};
