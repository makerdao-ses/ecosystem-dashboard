import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleNavigationCuAbout from './title-navigation-cu-about';
import { LinkModel, LinkType } from '../cutable-column-links/cutable-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';

export default {
  title: 'Components/CUAbout/TitleNavigationCuAbout',
  component: TitleNavigationCuAbout
} as ComponentMeta<typeof TitleNavigationCuAbout>;
const links: LinkModel[] = [{
  href: '#',
  linkType: LinkType.WWW,
},
{
  href: '#',
  linkType: LinkType.Forum,
},
{
  href: '#',
  linkType: LinkType.Discord,
},
{
  href: '#',
  linkType: LinkType.Twitter,
},
{
  href: '#',
  linkType: LinkType.Youtube,
},
{
  href: '#',
  linkType: LinkType.LinkedIn,
}];

const Template: ComponentStory<typeof TitleNavigationCuAbout> = (args) => <TitleNavigationCuAbout {...args} />;
export const Default = Template.bind({});
Default.args = {
  title: 'Sustainable Ecosystem Scaling',
  status: CuStatusEnum.Rejected,
  statusModified: new Date(),
  links
};

export const MissingData = Template.bind({});
MissingData.args = {
  title: 'Sustainable Ecosystem Scaling',
  status: CuStatusEnum.Rejected,
  statusModified: new Date(),
};
