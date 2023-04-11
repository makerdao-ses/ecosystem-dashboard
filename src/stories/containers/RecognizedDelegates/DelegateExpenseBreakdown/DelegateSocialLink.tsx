import styled from '@emotion/styled';
import Discord from '@ses/components/svg/discord';
import Forum from '@ses/components/svg/forum';
import Github from '@ses/components/svg/github';
import Gmail from '@ses/components/svg/gmail';
import LinkedIn from '@ses/components/svg/linkedin';
import Twitter from '@ses/components/svg/twitter';
import WWW from '@ses/components/svg/www';
import Youtube from '@ses/components/svg/youtube';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import Link from 'next/link';
import React from 'react';

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
};

const getImageForLink = (link: LinkModel, fill: string, width?: number, height?: number, fillDark?: string) => {
  const LinkComponent = linkComponents[link.linkType] || WWW;
  return <LinkComponent fill={fill} width={width} height={height} fillDark={fillDark} />;
};
export const DelegateSocialLinks = ({ width, height, links, fill = '#708390', fillDark }: CuTableColumnLinksProps) => (
  <Container>
    {links?.map((link, i) => (
      <BoxContainer>
        <Link href={link} passHref>
          <LinkImage
            key={i}
            href={link.href}
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

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  alignItems: 'center',
});

const BoxContainer = styled.div({
  width: 32,
  height: 32,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});
const LinkImage = styled.a({
  display: 'flex',
});
