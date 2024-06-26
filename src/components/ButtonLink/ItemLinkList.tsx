import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ExternalLink from '@/stories/components/ExternalLink/ExternalLink';
import type { FC } from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
  className?: string;
  onClick: () => void;
}

const ItemLinkList: FC<Props> = ({ icon, title, href, className, onClick }) => (
  <Container href={href} className={className} onClick={onClick} target="_blank">
    <IconContainer>{icon}</IconContainer>
    <Title>{title}</Title>
    <Arrow>
      <ExternalLink href={href} />
    </Arrow>
  </Container>
);

export default ItemLinkList;

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minHeight: 32,
  padding: '5px 6px 5px 4px',

  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.4)',
  },
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& svg': {
    width: 16,
    height: 16,

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[50],
    },
  },
}));

const Title = styled('div')(({ theme }) => ({
  flexGrow: 1,
  fontFamily: 'Inter ,sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[50],

  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
}));

const Arrow = styled('div')(({ theme }) => ({
  '& path': {
    fill: theme.palette.colors.blue[700],
  },
}));
