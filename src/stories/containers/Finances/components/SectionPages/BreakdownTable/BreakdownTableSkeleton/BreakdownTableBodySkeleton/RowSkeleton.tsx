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

  return (
    <Container background={backgroundRow}>
      <TitleBox>
        <ContainerItemsHeader
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {itemsHeader.map((_, index) => (
            <Skeleton
              variant="rectangular"
              width={numberWith[index]}
              height={9.62}
              sx={{
                backgroundColor: '#D1DEE6 ',
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
          </>
        )}
        {isTablet && (
          <>
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
  borderRadius: 6,
  background,
  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 0px 16px 8px',
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

const ContainerItemsHeader = styled('div')({});
