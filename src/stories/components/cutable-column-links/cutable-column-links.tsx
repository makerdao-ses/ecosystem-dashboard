import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import WWW from '../svg/www';
import Forum from '../svg/forum';
import Discord from '../svg/discord';
import Youtube from '../svg/youtube';
import Twitter from '../svg/twitter';
import LinkedIn from '../svg/linkedin';
import Gmail from '../svg/gmail';

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
  dark?: boolean;
}

const getImageForLink = ({ width, height, dark, link }: any) => {
  const fill = dark ? '#626472' : '#C4C4C4';
  switch (link.linkType) {
    case LinkType.WWW:
      return <WWW fill={fill} width={width} height={height} />;
    case LinkType.Forum:
      return <Forum fill={fill} width={width} height={height} />;
    case LinkType.Discord:
      return <Discord fill={fill} width={width} height={height} />;
    case LinkType.Twitter:
      return <Twitter fill={fill} width={width} height={height} />;
    case LinkType.Youtube:
      return <Youtube fill={fill} width={width} height={height} />;
    case LinkType.LinkedIn:
      return <LinkedIn fill={fill} width={width} height={height} />;
    case LinkType.Gmail:
      return <Gmail fill={fill} width={width} height={height} />;
    default:
      return <WWW />;
  }
};

export const CutableColumnLinks = ({ width, height, dark, links }: CutableColumnLinksProps) => {
  return <Container>
    {links.map((link, i) => <CustomPopover key={`link-${i}`} title={link.linkType} id={`link-${i}`}>
      <LinkImage href={link.href} target="_blank" width={width} height={height}>
        {getImageForLink({ link, dark, width, height })}
      </LinkImage>
    </CustomPopover>)}
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center'
});

type StickyLinkProps = {
  width?: string | number,
  height?: string | number,
}

const LinkImage = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
({ width = 32, height = 32 }: StickyLinkProps) => ({ width, height }));
