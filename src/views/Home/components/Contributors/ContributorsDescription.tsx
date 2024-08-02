import { styled } from '@mui/material';
import Link from 'next/link';
import Arrow from 'public/assets/svg/arrow.svg';
import React from 'react';
import type { TeamType } from '@/views/Contributors/components/TeamsSections/TeamsSections';
import type { FC } from 'react';

interface Props {
  contributor: TeamType;
  isLegacy: boolean;
}

const ContributorDescription: FC<Props> = ({ contributor, isLegacy }) => (
  <Container href={contributor.href}>
    <ContainerTitle isLegacy={isLegacy}>
      <span>
        {contributor.name} ({contributor.teams})
      </span>
      <LinkArrow isLegacy={isLegacy}>
        <Arrow />
      </LinkArrow>
    </ContainerTitle>
    <Description isLegacy={isLegacy}>{contributor.description}</Description>
  </Container>
);

export default ContributorDescription;

const Container = styled(Link)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const ContainerTitle = styled('div')<{ isLegacy: boolean }>(({ theme, isLegacy }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontSize: 14,
  fontWeight: 600,
  color: isLegacy
    ? theme.palette.isLight
      ? theme.palette.colors.gray[600]
      : theme.palette.colors.slate[50]
    : theme.palette.isLight
    ? theme.palette.colors.gray[600]
    : theme.palette.colors.slate[100],
  lineHeight: '24px',
}));

const LinkArrow = styled('div')<{ isLegacy: boolean }>(({ theme, isLegacy }) => ({
  display: 'flex',
  width: 24,
  height: 24,
  '& path': {
    fill: isLegacy
      ? theme.palette.isLight
        ? theme.palette.colors.gray[600]
        : theme.palette.colors.slate[100]
      : theme.palette.isLight
      ? theme.palette.colors.gray[600]
      : theme.palette.colors.slate[50],
  },
}));

const Description = styled('div')<{ isLegacy: boolean }>(({ theme, isLegacy }) => ({
  display: 'flex',
  fontSize: 12,
  fontWeight: 500,
  color: isLegacy
    ? theme.palette.isLight
      ? theme.palette.colors.gray[500]
      : theme.palette.colors.gray[500]
    : theme.palette.isLight
    ? theme.palette.colors.gray[500]
    : theme.palette.colors.gray[600],
  lineHeight: '18px',
}));
