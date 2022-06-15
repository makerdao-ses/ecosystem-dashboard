import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CoreUnitSummary } from './core-unit-summary';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

export default {
  title: 'Components/CUTransparencyReport/CoreUnitSummary',
  component: CoreUnitSummary
} as ComponentMeta<typeof CoreUnitSummary>;

const Template: ComponentStory<typeof CoreUnitSummary> = (args) => <CoreUnitSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  code: 'COD',
  title: 'Core Unit 1',
  categories: [
    CuCategoryEnum.Support,
    CuCategoryEnum.Business,
    CuCategoryEnum.Growth,
    CuCategoryEnum.Operational,
    CuCategoryEnum.Finance,
  ],
  status: CuStatusEnum.Accepted,
  links: [
    {
      href: '#',
      linkType: LinkTypeEnum.WWW
    },
    {
      href: '#',
      linkType: LinkTypeEnum.Forum
    },
    {
      href: '#',
      linkType: LinkTypeEnum.Discord
    },
    {
      href: '#',
      linkType: LinkTypeEnum.Youtube
    },
    {
      href: '#',
      linkType: LinkTypeEnum.LinkedIn
    },
    {
      href: '#',
      linkType: LinkTypeEnum.Gmail
    },
  ],
  description: 'The aim of SES is to sustainably grow the Maker Protocol\'s moats by systematically removing barriers between the decentralized workforce, capital, and work.',
  imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg'
};
