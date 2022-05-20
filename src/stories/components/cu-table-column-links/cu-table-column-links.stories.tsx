import React from 'react';
import { CuTableColumnLinks } from './cu-table-column-links';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

export default {
  title: 'Components/CUTable/ColumnLinks',
  component: CuTableColumnLinks,
} as ComponentMeta<typeof CuTableColumnLinks>;

const Template: ComponentStory<typeof CuTableColumnLinks> = (args) => <CuTableColumnLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
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
  ],
};
