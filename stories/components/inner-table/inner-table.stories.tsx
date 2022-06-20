import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InnerTable } from './inner-table';

export default {
  title: 'Components/General/InnerTable',
  component: InnerTable,
} as ComponentMeta<typeof InnerTable>;

const Template: ComponentStory<typeof InnerTable> = (args) => (
  <InnerTable {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  headers: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  items: [
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
    ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'],
  ]
};
