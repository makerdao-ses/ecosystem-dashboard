import React from 'react';
import styled from '@emotion/styled';
import www from '../../../assets/img/www.svg';
import forum from '../../../assets/img/forum.svg';
import discord from '../../../assets/img/discord.svg';
import twitter from '../../../assets/img/twitter.svg';
import youtube from '../../../assets/img/youtube.svg';
import linkedin from '../../../assets/img/linkedin.svg';
import gmail from '../../../assets/img/gmail.svg';
import { CustomPopover } from '../custom-popover/custom-popover';

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
      return www;
    case LinkType.Forum:
      return forum;
    case LinkType.Discord:
      return discord;
    case LinkType.Twitter:
      return twitter;
    case LinkType.Youtube:
      return youtube;
    case LinkType.LinkedIn:
      return linkedin;
    case LinkType.Gmail:
      return gmail;
    default:
      return www;
  }
};

export const CutableColumnLinks = (props: CutableColumnLinksProps) => {
  return <Container>
    {props.links.map((link, i) => <CustomPopover key={`link-${i}`} title={link.linkType} id={`link-${i}`}>
      <LinkImage href={link.href} target="_blank">
        <img alt={link.linkType} src={getImageForLink(link)} width={props.width} height={props.height} />
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
