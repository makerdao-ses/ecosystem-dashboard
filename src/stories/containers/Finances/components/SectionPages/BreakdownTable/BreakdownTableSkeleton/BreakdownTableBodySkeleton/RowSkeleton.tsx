import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

interface Props {
  numberItemsHeader: number;
  numberWith: number[];
  backgroundRow: string;
}

const RowSkeleton: React.FC<Props> = ({ numberItemsHeader, numberWith, backgroundRow }) => {
  const itemsHeader = Array.from({ length: numberItemsHeader }, () => 0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesk1440 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1440'));

  const TwoItemsSkeleton = () => (
    <TwoItemsSkeletonContainer>
      <ItemStyledSkeleton
        variant="rectangular"
        width={61}
        height={10}
        sx={{
          borderRadius: 13.5,
        }}
      />
      <ItemStyledSkeleton
        variant="rectangular"
        width={61}
        height={10}
        sx={{
          borderRadius: 13.5,
        }}
      />
    </TwoItemsSkeletonContainer>
  );
  return (
    <Container background={backgroundRow}>
      <TitleBox>
        <ContainerItemsHeader style={{}}>
          {itemsHeader.map((_, index) => (
            <ItemStyledSkeleton
              variant="rectangular"
              width={numberWith[index]}
              height={9.62}
              sx={{
                borderRadius: 13.5,
              }}
            />
          ))}
        </ContainerItemsHeader>
      </TitleBox>
      <ItemsBox>
        {isMobile && (
          <>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
          </>
        )}
        {isTablet && (
          <>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
            <ContainerItem>
              <ItemStyledSkeleton
                variant="rectangular"
                width={56}
                height={9.62}
                sx={{
                  borderRadius: 13.5,
                }}
              />
            </ContainerItem>
          </>
        )}
        {isDesk1024 && (
          <>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
          </>
        )}
        {isDesk1280 && (
          <>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
          </>
        )}
        {isDesk1440 && (
          <>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
            <ContainerItem>
              <TwoItemsSkeleton />
            </ContainerItem>
          </>
        )}
      </ItemsBox>
    </Container>
  );
};

export default RowSkeleton;

const Container = styled('div')<{ background: string }>(({ theme, background }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 8px',

  background,
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
  display: 'flex',
  gap: 4,
  flexDirection: 'column',
  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 136,
    flex: 1 / 6,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 142,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 228,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 228,
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
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 'calc(100%-142px)',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 'calc(100%-228px)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 'calc(100%-228px)',
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
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 130,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 130,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 130,
  },
}));

const TwoItemsSkeletonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const ContainerItemsHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const ItemStyledSkeleton = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#31424E',
}));
