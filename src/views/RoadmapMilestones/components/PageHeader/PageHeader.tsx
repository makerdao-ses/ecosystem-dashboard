import { styled } from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <Header>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Header>
);

export default PageHeader;

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const Title = styled('h1')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));

const Subtitle = styled('p')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  margin: 0,
  fontSize: 16,
  lineHeight: '22px',
}));
