import React from 'react';
import { CustomMultiSelect } from './custom-multi-select';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Generic/CustomMultiSelect',
  component: CustomMultiSelect
} as ComponentMeta<typeof CustomMultiSelect>;

const Template: ComponentStory<typeof CustomMultiSelect> = (args) => <CustomMultiSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: ['Apple', 'Orange', 'Banana', 'Strawberry'],
  label: 'Custom MultiSelect',
};

export const WithoutAll = Template.bind({});
WithoutAll.args = {
  items: ['Apple', 'Orange', 'Banana', 'Strawberry'],
  label: 'Custom MultiSelect',
  withAll: false
};
