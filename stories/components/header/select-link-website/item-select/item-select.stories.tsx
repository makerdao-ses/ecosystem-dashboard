import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ItemWebSite from './item-website';
import Logo from '../../../svg/logo';
import Makerdao from '../../../svg/makerdao';

export default {
  title: 'Components/General/ItemWebSite',
  component: ItemWebSite,
} as ComponentMeta<typeof ItemWebSite>;

const Template: ComponentStory<typeof ItemWebSite> = (args) => (
  <ItemWebSite {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Voting Portal',
  logo: <Logo />,
  color: '#FFFFFF',
  background: '#231635',
  fontSize: 16,
  fontWeight: 700,
};
export const DataDifferentColor = Template.bind({});
DataDifferentColor.args = {
  title: 'Voting Portal',
  logo: <Logo fill='#1AAB9B'/>,
  color: '#FFFFFF',
  background: '#1AAB9B',
  fontSize: 16,
  fontWeight: 700,
};

export const CircularLogo = Template.bind({});
CircularLogo.args = {
  title: 'Forum',
  logo: <Makerdao />,
  color: '#1AAB9B',
  fontSize: 16,
  fontWeight: 700,
};
