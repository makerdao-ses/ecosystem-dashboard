import React from 'react';
import { CuTableColumnExpenditures } from './cu-table-column-expenditures';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CuTableColumnExpenditures,
} as ComponentMeta<typeof CuTableColumnExpenditures>;

const Template: ComponentStory<typeof CuTableColumnExpenditures> = (args) => <CuTableColumnExpenditures {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 16500,
  percent: 120,
  items: [{ value: 70 }, { value: 85 }, { value: 120 }],
  budgetCaps: [90, 80, 100],
};
