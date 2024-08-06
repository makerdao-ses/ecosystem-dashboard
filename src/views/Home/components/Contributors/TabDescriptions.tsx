import { styled } from '@mui/material';
import React from 'react';

import type { TeamType } from '@/views/Contributors/components/TeamsSections/TeamsSections';
import ContributorDescription from './ContributorsDescription';
import type { FC } from 'react';

interface Props {
  contributorsDescription: TeamType[];
  isLegacy: boolean;
}

const TabDescriptions: FC<Props> = ({ contributorsDescription, isLegacy }) => (
  <Container isLegacy={isLegacy}>
    {contributorsDescription.map((contributor) => (
      <ContributorDescription contributor={contributor} isLegacy={isLegacy} />
    ))}
  </Container>
);

export default TabDescriptions;

const Container = styled('div')<{ isLegacy?: boolean }>(({ theme, isLegacy = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  padding: 0,
  backgroundColor: 'transparent',
  ...(isLegacy && {
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  }),

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: isLegacy ? 0 : 16,
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: isLegacy ? 0 : 32,
    gap: 48,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: isLegacy ? 0 : 32,
    gap: 64,
  },
}));
