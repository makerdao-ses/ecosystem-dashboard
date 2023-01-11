import React from 'react';
import { CustomMultiSelect } from './custom-multi-select';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/CustomMultiSelect',
  component: CustomMultiSelect,
} as ComponentMeta<typeof CustomMultiSelect>;

const Template: ComponentStory<typeof CustomMultiSelect> = (args) => <CustomMultiSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Custom MultiSelect',
  items: [
    {
      id: 'Apple',
      count: 0,
      content: 'Apple',
    },
    {
      id: 'Orange',
      count: 0,
      content: 'Orange',
    },
    {
      id: 'Mango',
      count: 0,
      content: 'Mango',
    },
    {
      id: 'Banana',
      count: 0,
      content: 'Banana',
    },
  ],
};
