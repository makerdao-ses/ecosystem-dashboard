import React from 'react';
import { CuTableColumnInitiatives } from './cu-table-column-initiatives';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnInitiatives',
  component: CuTableColumnInitiatives
} as ComponentMeta<typeof CuTableColumnInitiatives>;

const Template: ComponentStory<typeof CuTableColumnInitiatives> = (args) => <CuTableColumnInitiatives {...args} />;

export const Default = Template.bind({});
Default.args = {
  initiatives: 1
};
