import { styled } from '@mui/material';
import Link from 'public/assets/svg/link.svg';
import React from 'react';

import type { FC, MouseEvent } from 'react';
interface Props {
  className?: string;
  label?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonLinkOptions: FC<Props> = ({ label, onClick, className }) => (
  <Container className={className} label={!!label} onClick={onClick}>
    <ContainerLink>
      <Link />
    </ContainerLink>
    {label && <Label>{label}</Label>}
  </Container>
);

export default ButtonLinkOptions;

const Container = styled('button')<{ label?: boolean }>(({ theme, label = false }) => ({
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  padding: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
  width: 'fit-content',
  border: 'none',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  },
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    },
  },

  ...(label && {
    padding: '5.5px 8px 5.5px 4px',
  }),
  '&:focus': {
    outline: 'none',
  },
}));

const Label = styled('div')({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  letterSpacing: '1.5%',
});

const ContainerLink = styled('div')({
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
