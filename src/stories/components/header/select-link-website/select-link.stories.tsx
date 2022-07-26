import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SelectLink from './select-link';
import Logo from '../../svg/logo';
import Makerdao from '../../svg/makerdao';
import { WebSiteLinks } from './menu-items';

export default {
  title: 'Components/General/SelectLink',
  component: SelectLink,
} as ComponentMeta<typeof SelectLink>;

const Template: ComponentStory<typeof SelectLink> = (args) => (
  <SelectLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => () => { },
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
      id: '1',
      description: 'Easily view onchain data that surfaces key protocol health metrics.',
    },
    {
      title: 'Forum',
      logo: <Makerdao />,
      fontSize: 24,
      fontWeight: 400,
      color: '#1AAB9B',
      link: 'https://forum.makerdao.com/',
      marginBottom: '32px',
      id: '2',
      description: 'Easily view onchain data that surfaces key protocol health metrics.',
    },
    {
      title: 'Forum',
      logo: <Makerdao />,
      fontSize: 24,
      fontWeight: 400,
      color: '#1AAB9B',
      link: 'https://forum.makerdao.com/',
      marginBottom: '32px',
      id: '3',
      description: 'Easily view onchain data that surfaces key protocol health metrics.',
    },
  ] as WebSiteLinks[]
};
