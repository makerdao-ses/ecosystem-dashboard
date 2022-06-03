import React from 'react';
import { CustomMultiSelect } from './custom-multi-select';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomMultiSelect',
  component: CustomMultiSelect
} as ComponentMeta<typeof CustomMultiSelect>;

const Template: ComponentStory<typeof CustomMultiSelect> = (args) => <CustomMultiSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Custom MultiSelect',
  items: ['Apple', 'Orange', 'Banana', 'Anan', 'Strawberry']
};
