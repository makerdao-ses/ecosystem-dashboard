import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

export const HeaderRowSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <Container>
      <TitleBox>
        {isMobile && (
          <>
            <Skeleton
              variant="rectangular"
              width={38}
              height={9.62}
              sx={{
                backgroundColor: '#D1DEE6 ',
                borderRadius: 13.5,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={51}
              height={9.62}
              sx={{
                backgroundColor: '#D1DEE6 ',
                borderRadius: 13.5,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={39}
              height={9.62}
              sx={{
                backgroundColor: '#D1DEE6 ',
                borderRadius: 13.5,
              }}
            />
          </>
        )}
        {isTablet && (
          <>
            <Skeleton
              variant="rectangular"
              width={119}
              height={12.15}
              sx={{
                backgroundColor: '#D1DEE6 ',
                borderRadius: 13.5,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={90}
              height={12.15}
              sx={{
                backgroundColor: '#D1DEE6 ',
                borderRadius: 13.5,
              }}
            />
          </>
        )}
      </TitleBox>

      <>
        {isMobile && (
          <ItemsBox>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
          </ItemsBox>
        )}
        {isTablet && (
          <ItemsBox>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={61}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={61}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={61}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={61}
                height={9.62}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <Skeleton
                variant="rectangular"
                width={61}
                height={10.5}
                sx={{
                  backgroundColor: '#D1DEE6 ',
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
          </ItemsBox>
        )}
      </>
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 8px',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.50)',
  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 0px 16px 8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 8px ',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '8px 8px ',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px ',
  },
}));

const TitleBox = styled('div')(({ theme }) => ({
  minWidth: 76,
  flex: 1 / 4,
  display: 'flex',
  gap: 4,
  flexDirection: 'column',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 136,
    flex: 1 / 6,
  },
}));

const ContainerItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 76,
  flex: 1,
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 78,
  },
}));

const ItemsBox = styled('div')(({ theme }) => ({
  flex: 3 / 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 'calc(100%-145px)',
    flex: 5 / 6,
  },
}));
