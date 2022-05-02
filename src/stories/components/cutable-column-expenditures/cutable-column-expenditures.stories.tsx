import React from 'react';
import { CutableColumnExpenditures } from './cutable-column-expenditures';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CutableColumnExpenditures
} as ComponentMeta<typeof CutableColumnExpenditures>;

const Template: ComponentStory<typeof CutableColumnExpenditures> = (args) => <CutableColumnExpenditures {...args} />;

export const Main = Template.bind({});
Main.args = {
  value: 16500,
  percent: 85,
  items: [{ value: 28 }, { value: 23 }, { value: 41 }],
};
