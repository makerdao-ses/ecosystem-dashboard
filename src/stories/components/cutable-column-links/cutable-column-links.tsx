import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import WWW from '../svg/www';
import Forum from '../svg/forum';
import Discord from '../svg/discord';
import Youtube from '../svg/youtube';
import Twitter from '../svg/twitter';
import LinkedIn from '../svg/linkedin';

export enum LinkType {
  WWW = 'Website',
  Forum = 'Forum',
  Discord = 'Discord',
  Twitter = 'Twitter',
  Youtube = 'Youtube',
  LinkedIn = 'LinkedIn',
  Gmail = 'Gmail',
}

export interface LinkModel {
  href: string,
  linkType: LinkType,
}

interface CutableColumnLinksProps {
  links: LinkModel[]
  width?: number,
  height?: number;
}

const getImageForLink = (link: LinkModel) => {
  switch (link.linkType) {
    case LinkType.WWW:
      return <WWW/>;
    case LinkType.Forum:
      return <Forum/>;
    case LinkType.Discord:
      return <Discord/>;
    case LinkType.Twitter:
      return <Twitter/>;
    case LinkType.Youtube:
      return <Youtube/>;
    case LinkType.LinkedIn:
      return <LinkedIn/>;
    default:
      return <WWW/>;
  }
};

export const CutableColumnLinks = (props: CutableColumnLinksProps) => {
  return <Container>
    {props.links.map((link, i) => <CustomPopover key={`link-${i}`} title={link.linkType} id={`link-${i}`}>
      <LinkImage href={link.href} target="_blank">
      {getImageForLink(link)}
    </LinkImage>
    </CustomPopover>)}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const LinkImage = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
});
