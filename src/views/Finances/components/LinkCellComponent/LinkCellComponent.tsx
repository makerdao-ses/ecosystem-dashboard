import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import type { PropsWithChildren } from 'react';

interface Props {
  href: string;
  isSummaryRow?: boolean;
}

const LinkCellComponent: React.FC<Props & PropsWithChildren> = ({ href, children, isSummaryRow }) =>
  isSummaryRow ? (
    <Span>{children}</Span>
  ) : (
    <StyledLink href={href} scroll={false}>
      {children}
    </StyledLink>
  );
export default LinkCellComponent;

const Span = styled('span')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: 'inherit',
  zIndex: 1,
});

const StyledLink = styled(Link)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: 'inherit',
  zIndex: 1,
});
