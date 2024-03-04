import { Skeleton, styled } from '@mui/material';
import React from 'react';
import BarSkeletonItems from './BreakdownChartSkeletonUtils/BarSkeletonItem';
import ItemLegendValues from './BreakdownChartSkeletonUtils/ItemLegendValues';
import LegendAxisYItems from './BreakdownChartSkeletonUtils/LegendAxisYComponent';

const BreakdownChartSkeleton = () => {
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0);

  return (
    <Container>
      <ContainerLegendY>
        <LegendAxisYItems />
        <BarSkeletonItems />
      </ContainerLegendY>

      <ContainerAxisX>
        <Mobile>
          {arrayLegendAxisX.map((_, index) => (
            <ItemXAxis key={index}>
              <Skeleton
                variant="circular"
                width={index === (0 || 1 || 8 || 13) ? 6 : index === (2 || 4) ? 9 : index === (5 || 6) ? 5 : 9}
                height={7.75}
                sx={{ borderRadius: 11.25 }}
              />
            </ItemXAxis>
          ))}
        </Mobile>

        <MobileHidden>
          {arrayLegendAxisX.map(() => (
            <ContainerAxisXNotMobile>
              <Skeleton variant="rectangular" width={44} height={10.5} sx={{ borderRadius: 15 }} />
              <Skeleton variant="rectangular" width={32} height={10.5} sx={{ borderRadius: 15 }} />
            </ContainerAxisXNotMobile>
          ))}
        </MobileHidden>
      </ContainerAxisX>

      <LineContainer>
        <SkeletonLineMobileLeft variant="rectangular" width={130} height={11} />
        <CircleElementStyled variant="circular" width={28} height={13} />
        <SkeletonLineMobileRight variant="rectangular" width={130} height={11} />
      </LineContainer>
      <ContainerLegends>
        <ItemLegendValues />
        <ItemLegendValues />
        <ItemLegendValues />
      </ContainerLegends>
    </Container>
  );
};

export default BreakdownChartSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingLeft: 7,
  width: '100%',
  maxWidth: 343,

  minHeight: 275,
  marginLeft: 'auto',
  marginRight: 'auto',

  [theme.breakpoints.up('tablet_768')]: {
    height: 508,
    width: 704,
    maxWidth: 704,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 770,
    maxWidth: 770,
    justifyContent: 'center',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 1024,
    maxWidth: 1024,
  },
}));

const ContainerLegendY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  gap: 8,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 20,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 45,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const ContainerAxisX = styled('div')(({ theme }) => ({
  paddingLeft: 35,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 50,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
    paddingLeft: 40,
  },
}));
const ContainerAxisXNotMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4.5,
  alignItems: 'center',
  width: 38,
  [theme.breakpoints.up('tablet_768')]: {
    width: 40,
    gap: 4.5,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 56,
  },
}));

const ItemXAxis = styled('div')({
  width: 16,
  textAlign: 'center',
});

const LineContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  marginLeft: 16,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerLegends = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 24,
  rowGap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 64,
    marginTop: 40,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 24,
    gap: 32,
  },
}));

const SkeletonLineMobileLeft = styled(Skeleton)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,

  borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
  backgroundColor: 'transparent',
}));

const CircleElementStyled = styled(Skeleton)(({ theme }) => ({
  borderRadius: 12.5,
  backgroundColor: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
  marginLeft: 12,
  marginRight: 12,
  marginTop: 4,
}));

const SkeletonLineMobileRight = styled(Skeleton)(({ theme }) => ({
  borderBottomLeftRadius: 3,
  borderBottomRightRadius: 3,
  display: 'flex',
  borderRight: `1px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
  backgroundColor: 'transparent',
}));

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const MobileHidden = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    gap: 13,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    justifyContent: 'center',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));
