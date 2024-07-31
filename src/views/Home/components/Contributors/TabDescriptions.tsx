import { styled } from '@mui/material';
import React from 'react';

import ContributorDescription from './ContributorsDescription';
import type { ContributorsInformation } from '../../utils/types';
import type { FC } from 'react';

interface Props {
  contributorsDescription: ContributorsInformation[];
  isLegacy?: boolean;
}

const TabDescriptions: FC<Props> = ({ contributorsDescription, isLegacy }) => (
  <Container isLegacy={isLegacy}>
    {contributorsDescription.map((contributor) => (
      <ContributorDescription contributor={contributor} />
    ))}
  </Container>
);

export default TabDescriptions;

const Container = styled('div')<{ isLegacy?: boolean }>(({ theme, isLegacy = false }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: 8,
  padding: 0,
  backgroundColor: 'none',
  ...(isLegacy && {
    padding: '8px 8px',
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',
  }),

  [theme.breakpoints.up('tablet_768')]: {
    width: 247,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 272,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 347,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 304,
  },
}));
