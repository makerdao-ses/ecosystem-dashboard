import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

const HeaderTitleSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1028 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));
  return (
    <Container>
      {(isMobile || isTable) && (
        <>
          <ItemSkeleton variant="rectangular" />
          <ItemSkeleton variant="rectangular" />
        </>
      )}
      {isDesk1024 && (
        <>
          <ItemSkeleton variant="rectangular" width={84} />
          <ItemSkeleton variant="rectangular" width={136} />
        </>
      )}
      {isDesk1028 && <ItemSkeleton variant="rectangular" width={145} />}
    </Container>
  );
};

export default HeaderTitleSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 16,
  position: 'relative',
  width: 78,
  height: 48,
  ':after': {
    content: '""',
    position: 'absolute',
    height: 48,
    left: 70,
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
  },
  [theme.breakpoints.up('tablet_768')]: {
    width: 136,
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      right: 0,
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      right: -16,
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 228,
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      right: 10,
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
    },
  },
}));

const ItemSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 15,
  height: 10.5,
  width: 50,
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#31424E',
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 20,
    height: 14,
    width: 98,
  },
}));
