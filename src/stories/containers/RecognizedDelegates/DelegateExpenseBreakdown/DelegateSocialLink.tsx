import styled from '@emotion/styled';
import Discord from '@ses/components/svg/discord';
import Forum from '@ses/components/svg/forum';
import Github from '@ses/components/svg/github';
import Gmail from '@ses/components/svg/gmail';
import LinkedIn from '@ses/components/svg/linkedin';
import ProfileForum from '@ses/components/svg/profileForum';
import Twitter from '@ses/components/svg/twitter';
import VotingSocialPortal from '@ses/components/svg/votingSocialPortal';
import WWW from '@ses/components/svg/www';
import Youtube from '@ses/components/svg/youtube';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface LinkModel {
  href: string;
  linkType: LinkTypeEnum;
}

interface CuTableColumnLinksProps {
  links?: LinkModel[];
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
  boxLinkWidth?: number;
  boxLinkHeight?: number;
}

const linkComponents = {
  [LinkTypeEnum.WWW]: WWW,
  [LinkTypeEnum.Forum]: Forum,
  [LinkTypeEnum.Discord]: Discord,
  [LinkTypeEnum.Twitter]: Twitter,
  [LinkTypeEnum.Youtube]: Youtube,
  [LinkTypeEnum.LinkedIn]: LinkedIn,
  [LinkTypeEnum.Gmail]: Gmail,
  [LinkTypeEnum.Github]: Github,
  [LinkTypeEnum.ForumPlatform]: Forum,
  [LinkTypeEnum.ProfileForum]: ProfileForum,
  [LinkTypeEnum.VotingSocialPortal]: VotingSocialPortal,
};

const getImageForLink = (link: LinkModel, fill: string, width?: number, height?: number, fillDark?: string) => {
  const LinkComponent = linkComponents[link.linkType] || WWW;
  return <LinkComponent fill={fill} width={width} height={height} fillDark={fillDark} />;
};
export const DelegateSocialDtoLinks = ({
  width,
  height,
  links,
  fill = '#708390',
  fillDark,
  boxLinkHeight = 32,
  boxLinkWidth = 32,
}: CuTableColumnLinksProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      {links?.map((link, i) => (
        <BoxContainer boxLinkWidth={boxLinkWidth} boxLinkHeight={boxLinkHeight} key={link.linkType}>
          <Link href={link} passHref>
            <LinkImage
              isLight={isLight}
              key={i}
              target="_blank"
              onClick={(event: React.SyntheticEvent) => event.stopPropagation()}
            >
              {getImageForLink(link, fill, width, height, fillDark)}
            </LinkImage>
          </Link>
        </BoxContainer>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  alignItems: 'center',
});

const BoxContainer = styled.div<{ boxLinkWidth: number; boxLinkHeight: number }>(
  ({ boxLinkHeight = 32, boxLinkWidth = 32 }) => ({
    width: boxLinkWidth,
    height: boxLinkHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  })
);
const LinkImage = styled.a<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  '&:hover svg path': {
    fill: isLight ? '#231536' : '#48495F',
  },
}));
