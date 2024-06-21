import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import type { FC } from 'react';

interface Props {
  label: string;
  href: string;
  selected: string;
  handleClick: (value: string) => void;
}

const LinkNavBar: FC<Props> = ({ href, label, selected, handleClick }) => (
  <NavItem onClick={() => handleClick(label)}>
    <LinkStyle href={href} active={label.toLocaleLowerCase() === selected.toLocaleLowerCase()}>
      {label}
    </LinkStyle>
  </NavItem>
);

export default LinkNavBar;

const NavItem = styled('li')({
  listStyle: 'none',
  textDecoration: 'none',
});

const LinkStyle = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.isLight
    ? active
      ? theme.palette.colors.charcoal[900]
      : theme.palette.colors.slate[100]
    : active
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[600],
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
  },
  ':active': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
    ':hover': {
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
    },
  },
}));
