import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

const WaterFallSkeleton = () => {
  const arrayLegendAxisY = Array.from({ length: 9 }, () => 0);
  const arrayLegendAxisX = Array.from({ length: 14 }, () => 0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));

  const barWaterFall = (height: number, auxiliaryHeight: number, top = true, isHasLine = true) => (
    <ContainerBar>
      <AuxiliaryContainer height={auxiliaryHeight} />
      <ContainerBarLine top={top} isHasLine={isHasLine}>
        {' '}
        <SkeletonBarStyle variant="rectangular" width={isMobile ? 19 : isTablet ? 39 : 39} height={height} />
      </ContainerBarLine>
    </ContainerBar>
  );

  const legendAxisYItem = (width: number, height: number) => (
    <Skeleton
      variant="rectangular"
      width={width}
      height={height}
      sx={{ borderRadius: isMobile ? 12.5 : isTablet ? 17.5 : 17.5 }}
    />
  );

  const legendAxisXMobile = (width = 7) => (
    <Skeleton variant="circular" width={width} height={7.75} sx={{ borderRadius: 11.25 }} />
  );

  const ItemLegendValues = (circleDimension: number, itemWith: number) => (
    <ContainerItem>
      <Skeleton variant="circular" width={circleDimension} height={circleDimension} />
      <Skeleton variant="rectangular" width={itemWith} height={14} sx={{ borderRadius: 15 }} />
    </ContainerItem>
  );
  const lineMobile = (
    <LineContainer>
      <SkeletonLineMobileLeft variant="rectangular" width={170} height={11} sx={{}} />
      <CircleElementStyled variant="circular" width={28} height={13} />

      <SkeletonLineMobileRight variant="rectangular" width={170} height={11} sx={{}} />
    </LineContainer>
  );
  const axisXNotMobile = (monthWith: number, yearWidth: number) => (
    <ContainerAxisXNotMobile>
      <Skeleton variant="rectangular" width={monthWith} height={10.5} sx={{ borderRadius: 15 }} />
      <Skeleton variant="rectangular" width={yearWidth} height={10.5} sx={{ borderRadius: 15 }} />
    </ContainerAxisXNotMobile>
  );

  return (
    <Container>
      <ContainerLegendY>
        <LegendAxisY>
          {arrayLegendAxisY.map((_, index) => (
            <LegendAxisYItemContainer key={index}>
              {legendAxisYItem(isMobile ? 22 : isTablet ? 32 : 32, isMobile ? 8.7 : isTablet ? 12.5 : 12.5)}
            </LegendAxisYItemContainer>
          ))}
        </LegendAxisY>
        <ContainerBars>
          <ContainerBar>{barWaterFall(isMobile ? 190 : isTablet ? 378 : 378, 0, true)}</ContainerBar>
          <ContainerBar>{barWaterFall(isMobile ? 40 : isTablet ? 84 : 84, 0, false)}</ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 16 : isTablet ? 32 : 32, isMobile ? 40 : isTablet ? 80 : 80, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 17 : isTablet ? 32 : 32, isMobile ? 57 : isTablet ? 110 : 110, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 26 : isTablet ? 52 : 52, isMobile ? 48 : isTablet ? 90 : 90)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 44 : isTablet ? 78 : 78, isMobile ? 48 : isTablet ? 90 : 90, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 5 : isTablet ? 18 : 18, isMobile ? 90 : isTablet ? 170 : 170, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 17 : isTablet ? 36 : 36, isMobile ? 90 : isTablet ? 185 : 185, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 25 : isTablet ? 60 : 60, isMobile ? 83 : isTablet ? 160 : isDesk1024 ? 160 : 160)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 24 : isTablet ? 60 : 60, isMobile ? 60 : isTablet ? 100 : isDesk1024 ? 100 : 100)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 45 : isTablet ? 98 : 98, isMobile ? 60 : isTablet ? 100 : 100, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 14 : isTablet ? 39 : 39, isMobile ? 105 : isTablet ? 195 : 195, false)}
          </ContainerBar>
          <ContainerBar>
            {barWaterFall(isMobile ? 12 : isTablet ? 28 : 28, isMobile ? 123 : isTablet ? 232 : 232, false)}
          </ContainerBar>
          <ContainerBar isLast>
            {barWaterFall(isMobile ? 55 : isTablet ? 110 : 125, isMobile ? 135 : isTablet ? 260 : 260, true, false)}
          </ContainerBar>
        </ContainerBars>
      </ContainerLegendY>
      {
        <ContainerAxisX>
          {isMobile ? (
            <>
              {arrayLegendAxisX.map((_, index) => (
                <ItemXAxis key={index}>
                  {' '}
                  {legendAxisXMobile(
                    index === (0 || 1 || 8 || 13) ? 6 : index === (2 || 4) ? 9 : index === (5 || 6) ? 5 : 9
                  )}
                </ItemXAxis>
              ))}
            </>
          ) : (
            <>
              {arrayLegendAxisX.map(() => (
                <>{axisXNotMobile(44, 34)}</>
              ))}
            </>
          )}
        </ContainerAxisX>
      }
      {isMobile && <ContainerLine>{lineMobile}</ContainerLine>}
      <ContainerLegends>
        {ItemLegendValues(isMobile ? 8 : isTablet ? 12 : 12, isMobile ? 101 : isTablet ? 154 : 154)}
        {ItemLegendValues(isMobile ? 8 : isTablet ? 12 : 12, isMobile ? 45 : isTablet ? 80 : 80)}
        {ItemLegendValues(isMobile ? 8 : isTablet ? 12 : 12, isMobile ? 35 : isTablet ? 66 : 66)}
      </ContainerLegends>
    </Container>
  );
};

export default WaterFallSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingLeft: 7,
  width: '100%',
  maxWidth: 343,
  height: 275,
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('tablet_768')]: {
    height: 446,
    paddingLeft: 'revert',
    paddingRight: 'revert',
    maxWidth: 700,
    width: 704,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 954,
    width: 954,
    height: 508,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1185,
    width: 1185,
    height: 508,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1192,
    height: 508,
    width: 1192,
  },
}));

const ContainerLegendY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 8,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 20,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 40,
  },
}));

const ContainerBar = styled('div')<{ isLast?: boolean }>(({ theme, isLast = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 19,
  gap: 3,
  borderRadius: 10,
  [theme.breakpoints.up('tablet_768')]: {
    width: isLast ? 40 : 48,
    gap: 'revert',
  },
}));

const LegendAxisY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
}));

const ContainerBars = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 3,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 'revert',
    '& > div:last-of-type': {
      width: 40,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const AuxiliaryContainer = styled('div')<{ height: number }>(({ height }) => ({
  height,
  backgroundColor: 'transparent',
}));

const ContainerAxisX = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  paddingLeft: 30,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 60,
    gap: 10,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    paddingLeft: 50,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    paddingLeft: 70,
  },
}));
const ContainerAxisXNotMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4.5,
  alignItems: 'center',
  width: 38,
  [theme.breakpoints.up('tablet_768')]: {
    width: 37,
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 48,
    gap: 8,
  },
}));

const ItemXAxis = styled('div')({
  width: 19,
  textAlign: 'center',
});

const LineContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const ContainerItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const ContainerLegends = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 31,
  justifyContent: 'center',
  marginTop: 24,
  [theme.breakpoints.up('tablet_768')]: {
    height: 446,
    gap: 64,
  },
}));

const ContainerLine = styled('div')({
  marginLeft: 32,
});

const LegendAxisYItemContainer = styled('div')({});

const ContainerBarLine = styled('div')<{ top?: boolean; isHasLine: boolean }>(
  ({ theme, top = true, isHasLine = true }) => ({
    position: 'relative',
    ...(isHasLine && {
      '&:after': {
        content: '""',
        position: 'absolute',
        width: 10,
        right: -10,
        top: top ? 0 : 'unset',
        bottom: top ? 'unset' : 0,
        border: `2px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
      },
    }),

    [theme.breakpoints.up('tablet_768')]: {
      ...(isHasLine && {
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 10,
          right: -10,
          top: top ? 0 : 'unset',
          bottom: top ? 'unset' : 0,
          border: `2px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
        },
      }),
    },
    [theme.breakpoints.up('desktop_1024')]: {
      ...(isHasLine && {
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 26,
          right: -26,
          top: top ? 0 : 'unset',
          bottom: top ? 'unset' : 0,
          border: `2px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
        },
      }),
    },
    [theme.breakpoints.up('desktop_1280')]: {
      ...(isHasLine && {
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 42,
          right: -42,
          top: top ? 0 : 'unset',
          bottom: top ? 'unset' : 0,
          border: `2px solid ${theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E'}`,
        },
      }),
    },
  })
);

const SkeletonBarStyle = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
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
