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

  padding: 0,
  backgroundColor: 'transparent',
  ...(isLegacy && {
    margin: 8,
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

    '& a': {
      '&:first-of-type:hover': {
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      },
      '&:last-of-type:hover': {
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
      },
    },
  }),
}));
