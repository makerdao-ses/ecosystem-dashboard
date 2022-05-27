import React from 'react';
import { CustomMultiSelect2 } from './custom-multi-select-2';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomMultiSelect2',
  component: CustomMultiSelect2
} as ComponentMeta<typeof CustomMultiSelect2>;

const Template: ComponentStory<typeof CustomMultiSelect2> = (args) => <CustomMultiSelect2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Custom MultiSelect',
  items: ['Apple', 'Orange', 'Banana', 'Anan', 'Strawberry']
};
