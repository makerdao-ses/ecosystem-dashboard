import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react';
import type { CSSProperties } from 'react';
export type TypeIconFooter = {
  icon: JSX.Element;
  title: string;
  width?: number;
  height?: number;
  spacingsRight?: number;
  fill?: string;
  href: string;
};

interface CuTableColumnLinksProps {
  links: TypeIconFooter[];
  styleLinks?: CSSProperties;
}

export const FooterLinks = ({ links, styleLinks }: CuTableColumnLinksProps) => (
  <Container style={styleLinks}>
    {links.map((link, i) => (
      <Box key={`link-${i}`} sx={{ mr: `${link.spacingsRight ?? 0}px` }}>
        <LinkImage href={link.href} target="_blank" width={link.width} height={link.height}>
          {link.icon}
        </LinkImage>
      </Box>
    ))}
  </Container>
);

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
});

type StickyLinkProps = {
  width?: number;
  height?: number;
};

const LinkImage = styled.a(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  ({ width = 32, height = 32 }: StickyLinkProps) => ({
    width,
    height,
  })
);
