import { Skeleton, styled } from '@mui/material';
import React from 'react';

const HeaderRowSkeletonTitle = () => (
  <Container>
    <Mobile>
      <ItemStyledSkeleton
        variant="rectangular"
        width={38}
        height={9.62}
        sx={{
          borderRadius: 13.5,
        }}
      />
      <ItemStyledSkeleton
        variant="rectangular"
        width={51}
        height={9.62}
        sx={{
          borderRadius: 13.5,
        }}
      />
      <ItemStyledSkeleton
        variant="rectangular"
        width={39}
        height={9.62}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </Mobile>

    <Tablet>
      <ItemStyledSkeleton
        variant="rectangular"
        width={119}
        height={12.15}
        sx={{
          borderRadius: 13.5,
        }}
      />
      <ItemStyledSkeleton
        variant="rectangular"
        width={90}
        height={12.15}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </Tablet>

    <Desk1024>
      <ItemStyledSkeleton
        variant="rectangular"
        width={90}
        height={12.15}
        sx={{
          borderRadius: 13.5,
        }}
      />

      <ItemStyledSkeleton
        variant="rectangular"
        width={119}
        height={12.15}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </Desk1024>

    <Desk1280>
      <ItemStyledSkeleton
        variant="rectangular"
        width={190}
        height={12.15}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </Desk1280>

    <Desk1440>
      <ItemStyledSkeleton
        variant="rectangular"
        width={160}
        height={12.51}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </Desk1440>
  </Container>
);

export default HeaderRowSkeletonTitle;

const Container = styled('div')({
  display: 'flex',
});

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 4,
  height: 48,
  width: 78,
  border: '1px solid red',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const Tablet = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    width: 136,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
  },
}));

const Desk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
    width: 136,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
  },
}));

const Desk1280 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    display: 'flex',
    minWidth: 130,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    gap: 16,
  },
}));
const Desk1440 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    width: 136,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    gap: 16,
  },
}));

const ItemStyledSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#31424E',
}));
