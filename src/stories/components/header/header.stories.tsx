import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './header';
import { itemsWebSiteLinks } from './select-link-website/menu-items';
// import Logo from '../svg/logo';
// import Makerdao from '../svg/makerdao';

export default {
  title: 'Components/General/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);

export const Default = Template.bind({});
Default.args = {
  menuItems: [
    {
      title: 'Core Units',
      link: '/',
      marginRight: '32px'
    },
  ],
  links: itemsWebSiteLinks,
  themeMode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => { }
};
