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
  categories: [CuCategoryEnum.Support, CuCategoryEnum.Business, CuCategoryEnum.Support, CuCategoryEnum.Support, CuCategoryEnum.Finances],
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
  ]
};
