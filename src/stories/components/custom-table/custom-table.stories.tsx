import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomTable } from './custom-table';

export default {
  title: 'Components/General/CustomTable',
  component: CustomTable,
} as ComponentMeta<typeof CustomTable>;

const Template: ComponentStory<typeof CustomTable> = (args) => (
  <CustomTable {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  headers: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  items: [
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Ipsum', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  ]
};

export const Empty = Template.bind({});
Empty.args = {
  headers: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  items: []
};
