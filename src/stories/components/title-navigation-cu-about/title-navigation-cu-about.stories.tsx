import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import TitleNavigationCuAbout from './title-navigation-cu-about';
import { LinkModel } from '../cutable-column-links/cutable-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

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
