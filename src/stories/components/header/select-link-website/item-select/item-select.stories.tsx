import React from 'react';
import Logo from '../../../svg/logo';
import MakerBurn from '../../../svg/maker-burn';
import Makerdao from '../../../svg/makerdao';
import VotingPortal from '../../../svg/voting-portal';
import ItemWebSite from './item-website';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/General/ItemWebSite',
  component: ItemWebSite,
} as ComponentMeta<typeof ItemWebSite>;

const Template: ComponentStory<typeof ItemWebSite> = (args) => <ItemWebSite {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'makerburn.com',
  description: 'Easily view onchain data that surfaces key protocol health metrics.',
  logo: <MakerBurn />,
  color: '#000000',
  fontFamily: 'Cantarell,sans-serif',
  link: 'https://makerburn.com/#/',
  height: '120px',
};
export const DataDifferentColor = Template.bind({});
DataDifferentColor.args = {
  title: 'Forum',
  description: 'Get up to date on the latest discussions within the Maker community.',
  logo: <Makerdao />,
  color: '#1AAB9B',
  link: 'https://forum.makerdao.com/',
  fontFamily: 'SF Pro Display, sans-serif',
};

export const CircularLogo = Template.bind({});
CircularLogo.args = {
  logo: <Logo width={48} height={24.71} />,
  description: 'See how MKR holders are having their voice heard through protocol governance.',
  background: '#231635',
  fontSize: '16px',
  link: 'https://vote.makerdao.com/',
  subtract: <VotingPortal />,
  height: '120px',
};
