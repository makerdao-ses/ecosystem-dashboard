import React from 'react';
import styled from '@emotion/styled';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { CustomPopover } from '../custom-popover/custom-popover';
import WWW from '../svg/www';
import Forum from '../svg/forum';
import Discord from '../svg/discord';
import Youtube from '../svg/youtube';
import Twitter from '../svg/twitter';
import LinkedIn from '../svg/linkedin';
import Gmail from '../svg/gmail';

export interface LinkModel {
  href: string,
  linkType: LinkTypeEnum,
}

interface CutableColumnLinksProps {
  links: LinkModel[]
  width?: number,
  height?: number;
  dark?: boolean;
}

const getImageForLink = (link: LinkModel, dark?: boolean) => {
  switch (link.linkType) {
    case LinkTypeEnum.WWW:
      return <WWW fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.Forum:
      return <Forum fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.Discord:
      return <Discord fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.Twitter:
      return <Twitter fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.Youtube:
      return <Youtube fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.LinkedIn:
      return <LinkedIn fill={dark ? '#626472' : '#C4C4C4'} />;
    case LinkTypeEnum.Gmail:
      return <Gmail fill={dark ? '#626472' : '#C4C4C4'} />;
    default:
      return <WWW />;
  }
};

export const CutableColumnLinks = (props: CutableColumnLinksProps) => {
  return <Container>
    {props.links.map((link, i) => <CustomPopover key={`link-${i}`} title={link.linkType} id={`link-${i}`}>
      <LinkImage href={link.href} target="_blank">
        {getImageForLink(link, props.dark)}
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
