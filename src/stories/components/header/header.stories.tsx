import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from './header';
import { itemsWebSiteLinks } from './select-link-website/menu-items';

export default {
  title: 'Components/General/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: itemsWebSiteLinks,
};
