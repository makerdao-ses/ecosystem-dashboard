import React from 'react';
import { CutableColumnLinks } from './cutable-column-links';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LinkType } from '../../../core/enums/link-type.enum';

export default {
  title: 'Components/CUTable/ColumnLinks',
  component: CutableColumnLinks,
} as ComponentMeta<typeof CutableColumnLinks>;

const Template: ComponentStory<typeof CutableColumnLinks> = (args) => <CutableColumnLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      linkType: LinkType.WWW,
      href: '#',
    },
    {
      linkType: LinkType.Forum,
      href: '#',
    },
    {
      linkType: LinkType.Discord,
      href: '#',
    },
    {
      linkType: LinkType.Twitter,
      href: '#',
    },
    {
      linkType: LinkType.Youtube,
      href: '#',
    },
    {
      linkType: LinkType.LinkedIn,
      href: '#',
    },
  ],
};
