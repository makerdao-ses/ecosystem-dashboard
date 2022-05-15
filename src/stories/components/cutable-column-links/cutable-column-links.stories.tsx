import React from 'react';
import { CutableColumnLinks } from './cutable-column-links';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

export default {
  title: 'Components/CUTable/ColumnLinks',
  component: CutableColumnLinks,
} as ComponentMeta<typeof CutableColumnLinks>;

const Template: ComponentStory<typeof CutableColumnLinks> = (args) => <CutableColumnLinks {...args} />;

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
