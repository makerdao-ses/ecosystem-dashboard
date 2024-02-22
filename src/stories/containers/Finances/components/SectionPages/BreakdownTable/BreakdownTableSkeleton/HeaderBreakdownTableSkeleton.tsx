import { styled, useMediaQuery } from '@mui/material';
import React from 'react';
import HeaderTitleSkeleton from './HeaderTitleSkeleton';
import ItemHeaderSkeleton from './ItemHeaderSkeleton';
import type { Theme } from '@mui/material';

const HeaderBreakdownTableSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1028 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));
  return (
    <Container>
      <TitleBox>
        <HeaderTitleSkeleton />
      </TitleBox>
      <>
        {isMobile && (
          <ItemsBox>
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton isLast={true} />
          </ItemsBox>
        )}
        {isTable && (
          <ItemsBox>
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton isLast={true} />
          </ItemsBox>
        )}
        {isDesk1024 && (
          <ItemsBox>
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton isLast={true} />
          </ItemsBox>
        )}
        {isDesk1028 && (
          <ItemsBox>
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton />
            <ItemHeaderSkeleton isLast={true} />
          </ItemsBox>
        )}
      </>
    </Container>
  );
};

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

const ItemsBox = styled('div')(({ theme }) => ({
  flex: 3 / 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  minWidth: 'calc(100%-76px)',
  justifyContent: 'space-between',

  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 'calc(100%-136px)',
    flex: 5 / 6,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 'calc(100%-142px)',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 'calc(100%-228px)',
  },
}));
