import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleNavigationCuAbout from './title-navigation-cu-about';
import { LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { CuAbout, CuMip, SocialMediaChannels } from '../../containers/cu-about/cu-about.api';

export default {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout
} as ComponentMeta<typeof TitleNavigationCuAbout>;
const links: LinkModel[] = [{
  href: '#',
  linkType: LinkTypeEnum.WWW,
},
{
  href: '#',
  linkType: LinkTypeEnum.Forum,
},
{
  href: '#',
  linkType: LinkTypeEnum.Discord,
},
{
  href: '#',
  linkType: LinkTypeEnum.Twitter,
},
{
  href: '#',
  linkType: LinkTypeEnum.Youtube,
},
{
  href: '#',
  linkType: LinkTypeEnum.LinkedIn,
}];

const Template: ComponentStory<typeof TitleNavigationCuAbout> = (args) => <TitleNavigationCuAbout {...args} />;
export const Default = Template.bind({});
Default.args = {
  coreUnitAbout: {
    id: '1',
    code: 'SES-001',
    category: [],
    name: 'Sustainable Ecosystem Scaling',
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    socialMediaChannels: [{
      discord: 'https://discord.gg/h7GKvqDyDP',
      forumTag: 'ses-001',
      linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
      twitter: '',
      youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
    }] as SocialMediaChannels[],
    cuMip: [
      {
        mipCode: 'MIP-1',
        accepted: '2020-01-01',
        rejected: '2020-01-01',
        rfc: '2020-01-01',
        obsolete: '2020-01-01',
        mipUrl: 'https://makerdao.com/',
        mipStatus: CuStatusEnum.Obsolete,
      }
    ] as CuMip[],
    budgetStatements: [],
    contributorCommitment: [],
  } as CuAbout
};
