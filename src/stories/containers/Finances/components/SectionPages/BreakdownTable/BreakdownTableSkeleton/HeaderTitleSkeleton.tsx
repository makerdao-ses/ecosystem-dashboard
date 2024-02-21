import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

const HeaderTitleSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  return (
    <Container>
      {(isMobile || isTable) && (
        <>
          <ItemSkeleton variant="rectangular" />
          <ItemSkeleton variant="rectangular" />
        </>
      )}
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
    borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#546978'}`,
  },
  [theme.breakpoints.up('tablet_768')]: {
    width: 136,
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      right: 0,
      borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : '#546978'}`,
    },
  },
}));

const ItemSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 15,
  height: 10.5,
  width: 50,
  backgroundColor: '#D1DEE6',
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 20,
    height: 14,
    width: 98,
  },
}));
