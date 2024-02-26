import { Skeleton, styled } from '@mui/material';
import React from 'react';

const HeaderTitleSkeleton = () => (
  <Container>
    <Mobile>
      <ItemSkeleton variant="rectangular" />
      <ItemSkeleton variant="rectangular" />
    </Mobile>
    <Table>
      <ItemSkeleton variant="rectangular" />
      <ItemSkeleton variant="rectangular" />
    </Table>

    <Desk1024>
      <ItemSkeleton variant="rectangular" width={84} />
      <ItemSkeleton variant="rectangular" width={136} />
    </Desk1024>

    <Desk1028>
      <ItemSkeleton variant="rectangular" width={145} />
    </Desk1028>
  </Container>
);
export default HeaderTitleSkeleton;

const Container = styled('div')({
  display: 'flex',
});

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

const Mobile = styled('div')(({ theme }) => ({
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
    display: 'none',
  },
}));
const Table = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
    position: 'relative',
    [theme.breakpoints.up('tablet_768')]: {
      width: 136,
      height: 48,
      ':after': {
        content: '""',
        position: 'absolute',
        height: 48,
        right: 0,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
      },
    },
  },
}));

const Desk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
    position: 'relative',
    [theme.breakpoints.up('desktop_1024')]: {
      ':after': {
        content: '""',
        position: 'absolute',
        height: 48,
        right: -16,
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#D1DEE6' : 'rgb(84, 105, 120, 0.30)'}`,
      },
    },
  },
}));

const Desk1028 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    gap: 16,
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
  },
}));
