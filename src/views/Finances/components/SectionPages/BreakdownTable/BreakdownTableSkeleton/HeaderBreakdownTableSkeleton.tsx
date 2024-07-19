import { styled } from '@mui/material';
import React from 'react';
import HeaderTitleSkeleton from './HeaderTitleSkeleton';
import ItemHeaderSkeleton from './ItemHeaderSkeleton';

const HeaderBreakdownTableSkeleton = () => (
  <Container>
    <TitleBox>
      <HeaderTitleSkeleton />
    </TitleBox>
    <>
      <Mobile>
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton isLast={true} />
      </Mobile>

      <Table>
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton isLast={true} />
      </Table>

      <Desk1024>
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton isLast={true} />
      </Desk1024>

      <Desk10280>
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton />
        <ItemHeaderSkeleton isLast={true} />
      </Desk10280>
    </>
  </Container>
);

export default HeaderBreakdownTableSkeleton;
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 8px',
  borderRadius: 6,
  background: theme.palette.mode === 'light' ? 'rgba(236, 239, 249, 0.50)' : 'rgb(64, 83, 97, 0.3)',
  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 0px 16px 8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px',
  },
}));

const TitleBox = styled('div')(({ theme }) => ({
  minWidth: 76,
  display: 'flex',
  flex: 1 / 4,
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 136,
    flex: 1 / 6,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 142,
    flex: 1 / 6,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 228,
    flex: 1 / 6,
  },
}));

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flex: 3 / 4,
  flexDirection: 'row',
  alignItems: 'center',
  minWidth: 'calc(100%-76px)',
  justifyContent: 'space-between',

  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Table = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flex: 5 / 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    minWidth: 'calc(100%-136px)',
  },
}));
const Desk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    minWidth: 'calc(100%-142px)',
    flex: 5 / 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
}));

const Desk10280 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    minWidth: 'calc(100%-228px)',
    flex: 5 / 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
}));
