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
  links: LinkModel[]
  width?: number,
  height?: number;
  spacingsRight?: number,
  fill?: string;
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

export const CuTableColumnLinks = ({ width, height, links, spacingsRight, fill = '#C4C4C4' }: CuTableColumnLinksProps) => {
  return <Container>
    {links.map((link, i) => <CustomPopover
      key={`link-${i}`}
      title={link.linkType}
      id={`link-${i}`}>
      <Box sx={{ mr: `${spacingsRight}px` || '0px' }}>
        <LinkImage
          href={link.href}
          target="_blank"
          width={width}
          height={height}>
          {getImageForLink(link, fill, width, height)}
        </LinkImage>
      </Box>
    </CustomPopover>)
    }
  </Container >;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center'
});

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
