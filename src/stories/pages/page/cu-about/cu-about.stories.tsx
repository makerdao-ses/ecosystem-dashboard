import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CuAbout from './cu-about';
import { CardInfoMemberType } from '../../../components/card-info-member/card-info-member';
import { LinkModel } from '../../../components/cutable-column-links/cutable-column-links';
import { RelateMipType } from '../../../components/relate-mips/relate-mips';
import { CuStatusEnum } from '../../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../../core/enums/link-type.enum';

export default {
  title: 'Pages/CuAbout',
  component: CuAbout,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CuAbout>;
const src = 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg';
const numbersMembers: CardInfoMemberType[] = [
  { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
  { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
  { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
  { avatar: src, name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
  { avatar: '', name: 'John Doe', username: 'forum @username', jobTitle: 'Research Expert', commitment: 'Full Time' },
];

const links: LinkModel[] = [
  {
    linkType: LinkTypeEnum.WWW,
    href: '#',
  },
  {
    linkType: LinkTypeEnum.Forum,
    href: '#',
  },
  {
    linkType: LinkTypeEnum.Discord,
    href: '#',
  },
  {
    linkType: LinkTypeEnum.Twitter,
    href: '#',
  },
  {
    linkType: LinkTypeEnum.Youtube,
    href: '#',
  },
  {
    linkType: LinkTypeEnum.LinkedIn,
    href: '#',
  },
];

const relateMips: RelateMipType[] = [{
  status: CuStatusEnum.Rejected,
  statusModified: new Date(),
  href: '#',
  mipTitle: 'MIP40c3-SP1: Modify Core Unit Budget - Real-World Finance (RWF-001)',
},
{
  status: CuStatusEnum.Rejected,
  statusModified: new Date(),
  href: '#',
  mipTitle: 'MIP41c4-SP29: Facilitator Onboarding for Maker Talent Core Unit (MT-001)',
},

];

const Template: ComponentStory<typeof CuAbout> = () => <CuAbout />;

export const CuAboutPage = Template.bind({});
CuAboutPage.args = {
  links,
  numbersMembers,
  relateMips,
};
