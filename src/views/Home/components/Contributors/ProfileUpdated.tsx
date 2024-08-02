import { styled } from '@mui/material';
import React from 'react';
import type { DateTime } from 'luxon';
import type { FC } from 'react';

interface Props {
  date?: DateTime;
}

const ProfileUpdated: FC<Props> = ({ date }) => (
  <Container>
    <Label>Profile Updated</Label>
    <DateContainer>{date?.toFormat('dd.MM.yyyy') ?? 'No data'}</DateContainer>
  </Container>
);

export default ProfileUpdated;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderRadius: '0px 0px 12px 12px',
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.20);',
  padding: '4px 20px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '4px 20px 2px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    background: 'revert',
    borderTop: 'revert',
    borderRadius: 'revert',
    padding: '4px 8px 4px 0px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 122,
    padding: 'revert',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 'revert',
    padding: '4px 16px',
  },
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const DateContainer = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[300],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));
