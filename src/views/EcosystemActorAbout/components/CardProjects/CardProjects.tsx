import { styled } from '@mui/material';

import { siteRoutes } from '@ses/config/routes';

import React from 'react';
import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

interface CardProjectsProps {
  actorName: string;
  shortCode: string;
  className?: string;
}

const CardProjects: React.FC<CardProjectsProps> = ({ actorName, shortCode, className }) => (
  <Container className={className}>
    <Title>Projects</Title>

    <CardProject>
      <CardDescription>View all the of the projects {actorName} is involved in and there status.</CardDescription>
      <InternalLinkButtonStyled label="View Projects" href={siteRoutes.ecosystemActorProjects(shortCode)} showIcon />
    </CardProject>
  </Container>
);

export default CardProjects;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
});

const Title = styled('h3')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  margin: '0 0 0px',

  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '24px',
  letterSpacing: 0.4,
}));

const CardProject = styled(Card)(({ theme }) => ({
  display: 'flex',
  padding: 8,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,

  backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: 16,
    gap: 16,
  },
}));

const CardDescription = styled('p')(({ theme }) => ({
  margin: '0 0 0px',
  color: theme.palette.isLight ? '#546978' : theme.palette.colors.gray[500],
  fontSize: 15,
  fontWeight: 500,
  lineHeight: '24px',
  letterSpacing: 0.4,
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)(() => ({
  borderRadius: 6,
  height: 32,
  padding: '4px 13.5px 4px 13.5px',
  ':hover': {
    padding: '4px 13.5px 4px 13.5px',
  },
  '& div': {
    letterSpacing: '-0.32px',
  },
}));
