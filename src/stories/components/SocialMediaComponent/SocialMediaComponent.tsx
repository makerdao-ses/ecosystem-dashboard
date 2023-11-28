import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Discord from '@ses/components/svg/discord';
import Forum from '@ses/components/svg/forum';
import Github from '@ses/components/svg/github';
import Gmail from '@ses/components/svg/gmail';
import LinkedIn from '@ses/components/svg/linkedin';
import ProfileForum from '@ses/components/svg/profileForum';
import Twitter from '@ses/components/svg/twitter';
import TwitterFooter from '@ses/components/svg/twitter-footer';
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
  toolTipDescription?: string;
}

interface CuTableColumnLinksProps {
  links?: LinkModel[];
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
  boxLinkWidth?: number;
  boxLinkHeight?: number;
  hasTooltip?: boolean;
  className?: string;
}

const linkComponents = {
  [LinkTypeEnum.WWW]: WWW,
  [LinkTypeEnum.Forum]: Forum,
  [LinkTypeEnum.ProfileForum]: ProfileForum,
  [LinkTypeEnum.Discord]: Discord,
  [LinkTypeEnum.Twitter]: Twitter,
  [LinkTypeEnum.Youtube]: Youtube,
  [LinkTypeEnum.LinkedIn]: LinkedIn,
  [LinkTypeEnum.Gmail]: Gmail,
  [LinkTypeEnum.Github]: Github,
  [LinkTypeEnum.VotingSocialPortal]: VotingSocialPortal,
  [LinkTypeEnum.TwitterFooter]: TwitterFooter,
};

const getImageForLink = (link: LinkModel, fill: string, width?: number, height?: number, fillDark?: string) => {
  const LinkComponent = linkComponents[link.linkType] || WWW;
  return <LinkComponent fill={fill} width={width} height={height} fillDark={fillDark} />;
};
const SocialMediaComponent = ({
  width,
  height,
  links,
  fill = '#708390',
  fillDark,
  boxLinkHeight = 32,
  boxLinkWidth = 32,
  hasTooltip = false,
  className,
}: CuTableColumnLinksProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container className={className}>
      {links?.map((link, i) => (
        <BoxContainer boxLinkWidth={boxLinkWidth} boxLinkHeight={boxLinkHeight} key={link.linkType.toString()}>
          {hasTooltip ? (
            <CustomPopover
              title={link?.toolTipDescription}
              id={'popover-fulltime equivalent'}
              popupStyle={{
                color: isLight ? '#231536' : '#D2D4EF',
              }}
            >
              <Link href={link.href} passHref legacyBehavior>
                <LinkImage
                  marginBottom={link.linkType === LinkTypeEnum.VotingSocialPortal}
                  isLight={isLight}
                  key={i}
                  target="_blank"
                  onClick={(event: React.SyntheticEvent) => event.stopPropagation()}
                >
                  {getImageForLink(link, fill, width, height, fillDark)}
                </LinkImage>
              </Link>
            </CustomPopover>
          ) : (
            <Link href={link.href} passHref legacyBehavior>
              <LinkImage
                marginBottom={link.linkType === LinkTypeEnum.VotingSocialPortal}
                isLight={isLight}
                key={i}
                target="_blank"
                onClick={(event: React.SyntheticEvent) => event.stopPropagation()}
              >
                {getImageForLink(link, fill, width, height, fillDark)}
              </LinkImage>
            </Link>
          )}
        </BoxContainer>
      ))}
    </Container>
  );
};
export default SocialMediaComponent;
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
const LinkImage = styled.a<WithIsLight & { marginBottom?: boolean }>(({ isLight, marginBottom = false }) => ({
  display: 'flex',
  ...(marginBottom && { marginBottom: 8 }),

  '@media (hover: hover)': {
    '&:hover svg path': {
      fill: isLight ? '#231536' : '#48495F',
      stroke: isLight ? '#231536' : '#48495F',
    },
  },
}));
