import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Components/General/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Header {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      title: 'Core Units',
      link: '/core-units',
      marginRight: '64px'
    },
    {
      title: 'Strategic Initiatives',
      link: '/strategic-initiatives',
      marginRight: '64px'
    },
    {
      title: 'Finances',
      link: '/finances',
      marginRight: '64px'
    },
    {
      title: 'People',
      link: '/people',
      marginRight: '0px'
    },
  ]
};
