import React from 'react';
import styled from '@emotion/styled';
import www from '../../../assets/img/www.svg';
import forum from '../../../assets/img/forum.svg';
import discord from '../../../assets/img/discord.svg';
import twitter from '../../../assets/img/twitter.svg';
import youtube from '../../../assets/img/youtube.svg';
import linkedin from '../../../assets/img/linkedin.svg';

export enum LinkType {
  WWW = 'www',
  Forum = 'forum',
  Discord = 'discord',
  Twitter = 'twitter',
  Youtube = 'youtube',
  LinkedIn = 'linkedIn',
}

export interface LinkModel {
  href: string,
  linkType: LinkType
}

interface CutableColumnLinksProps {
  links: LinkModel[]
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
    default:
      return www;
  }
};

export const CutableColumnLinks = (props: CutableColumnLinksProps) => {
  return <Container>
    {props.links.map((link, i) => <LinkImage key={`link-${i}`} href={link.href} target="_blank">
      <img alt={link.linkType} src={getImageForLink(link)}/>
    </LinkImage>)}
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
