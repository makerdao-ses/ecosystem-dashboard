import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './Header';
import Logo from '../svg/logo';
import Makerdao from '../svg/makerdao';

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
  ],
  links: [
    {
      title: 'Voting Portal',
      logo: <Logo />,
      background: '#231635',
      fontSize: 16,
      color: '#FFFFFF',
      link: 'https://vote.makerdao.com/',
      marginTop: '32px',
      marginBottom: '32px',
    },
    {
      title: 'Forum',
      logo: <Makerdao />,
      fontSize: 24,
      fontWeight: 400,
      color: '#1AAB9B',
      link: 'https://forum.makerdao.com/',
      marginBottom: '32px',
    },
  ]
};
