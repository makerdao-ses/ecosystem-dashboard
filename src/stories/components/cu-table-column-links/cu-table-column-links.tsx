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
import { Box } from '@mui/material';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

export interface LinkModel {
  href: string,
  linkType: LinkTypeEnum,
}

interface CuTableColumnLinksProps {
  links: LinkModel[];
  width?: number;
  height?: number;
  spacings?: number;
  fill?: string;
  lastChild?: boolean;
  align?: 'flex-start' | 'center' | 'flex-end';
}

const getImageForLink = (link: LinkModel, fill: string, width?: number, height?: number) => {
  switch (link.linkType) {
    case LinkTypeEnum.WWW:
      return <WWW fill={fill} width={width} height={height} />;
    case LinkTypeEnum.Forum:
      return <Forum fill={fill} width={width} height={height} />;
    case LinkTypeEnum.Discord:
      return <Discord fill={fill} width={width} height={height} />;
    case LinkTypeEnum.Twitter:
      return <Twitter fill={fill} width={width} height={height} />;
    case LinkTypeEnum.Youtube:
      return <Youtube fill={fill} width={width} height={height} />;
    case LinkTypeEnum.LinkedIn:
      return <LinkedIn fill={fill} width={width} height={height} />;
    case LinkTypeEnum.Gmail:
      return <Gmail fill={fill} width={width} height={height} />;
    default:
      return <WWW />;
  }
};

export const CuTableColumnLinks = ({ width, height, links, align = 'flex-end', spacings, fill = '#C4C4C4', lastChild = false }: CuTableColumnLinksProps) => {
  return <Container spacings={spacings} align={align}>
    {links.map((link, i) => <StyleBox lastChild={lastChild}
      key={`link-${i}`}>
      <CustomPopover
        title={link.linkType}
        id={`link-${i}`}>
        <LinkImage
          href={link.href}
          target="_blank"
          width={width}
          height={height}>
          {getImageForLink(link, fill, width, height)}
        </LinkImage>
      </CustomPopover>
    </StyleBox>)
    }
  </Container >;
};

const Container = styled.div<{ spacings?: number, align: string}>(({ spacings, align }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: align,
  gap: `${spacings ?? 0}px`
}));

type StickyLinkProps = {
  width?: number,
  height?: number,
}

const LinkImage = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
({ width = 32, height = 32 }: StickyLinkProps) => ({
  width,
  height
}));

const StyleBox = styled(Box)<{ lastChild?: boolean }>((props) => ({
  '&:last-child': props.lastChild && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
  },
}));
