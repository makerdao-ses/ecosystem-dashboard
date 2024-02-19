import { Box, Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import type { Theme } from '@mui/material';

const BreakdownChartSkeleton = () => {
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));

  const barSkeleton = (height: number, percentFilled: number) => (
    <WrapperBox
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      width={isMobile ? 16 : isTablet || isDesktop1024 ? 40 : isDesk1280 ? 56 : 56}
      height={`${height}px`}
      position="relative"
      sx={{
        borderTopLeftRadius: isMobile ? 4 : isTablet ? 6 : 6,
        borderTopRightRadius: isMobile ? 4 : isTablet ? 6 : 6,
        overflow: 'hidden',
        borderBottomLeftRadius: isMobile ? 4 : isTablet ? 6 : 6,
        borderBottomRightRadius: isMobile ? 4 : isTablet ? 6 : 6,
      }}
    >
      <InsideBox
        width={isMobile ? 16 : isTablet || isDesktop1024 ? 40 : isDesk1280 ? 56 : 56}
        height={percentFilled}
        sx={{
          position: 'absolute',
          borderBottomLeftRadius: isMobile ? 4 : isTablet ? 6 : 6,
          borderBottomRightRadius: isMobile ? 4 : isTablet ? 6 : 6,
        }}
      />
    </WrapperBox>
  );

  const ItemLegendValues = (circleDimension: number, itemWith: number) => (
    <ContainerItem>
      <Skeleton variant="circular" width={circleDimension} height={circleDimension} />
      <Skeleton
        variant="rectangular"
        width={itemWith}
        height={isMobile ? 10.5 : isTablet ? 14 : 14}
        sx={{ borderRadius: 15 }}
      />
    </ContainerItem>
  );

  const ItemLegendAxisValues = (width: number, height: number) => (
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
          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 13 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 26 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 16 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 25 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 16 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 25 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 16 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 25 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>

          <LegendAxisYItemContainer>
            {ItemLegendAxisValues(isMobile ? 16 : isTablet ? 32 : 32, isMobile ? 8.75 : isTablet ? 12.5 : 12.5)}
          </LegendAxisYItemContainer>
        </LegendAxisY>
        <ContainerBars>
          <ContainerBar>
            {barSkeleton(isMobile ? 148 : isTablet ? 297 : 297, isMobile ? 148 : isTablet ? 297 : 297)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 150 : isTablet ? 296 : 296, isMobile ? 150 : isTablet ? 296 : 296)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 155 : isTablet ? 299 : 299, isMobile ? 155 : isTablet ? 299 : 299)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 139 : isTablet ? 274 : 274, isMobile ? 139 : isTablet ? 274 : 274)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 150 : isTablet ? 296 : 296, isMobile ? 98 : isTablet ? 192 : 192)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 156 : isTablet ? 306 : 306, isMobile ? 82 : isTablet ? 160 : 160)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 162 : isTablet ? 316 : 316, isMobile ? 62 : isTablet ? 124 : 124)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 166 : isTablet ? 332 : 332, isMobile ? 45 : isTablet ? 101 : 101)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 164 : isTablet ? 338 : 338, isMobile ? 36 : isTablet ? 70 : 70)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 162 : isTablet ? 345 : 345, isMobile ? 23 : isTablet ? 50 : 50)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 169 : isTablet ? 353 : 353, isMobile ? 15 : isTablet ? 30 : 30)}
          </ContainerBar>
          <ContainerBar>
            {barSkeleton(isMobile ? 168 : isTablet ? 376 : 367, isMobile ? 7 : isTablet ? 16 : 16)}
          </ContainerBar>
        </ContainerBars>
      </ContainerLegendY>
      {
        <ContainerAxisX>
          {isMobile ? (
            <>
              {arrayLegendAxisX.map((_, index) => (
                <ItemXAxis key={index}>
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
        {ItemLegendValues(isMobile ? 12 : 16, isMobile ? 85 : isTablet ? 109 : isDesktop1024 ? 106 : 106)}
        {ItemLegendValues(isMobile ? 12 : 16, isMobile ? 93 : isTablet ? 91 : isDesktop1024 ? 114 : 114)}
        {ItemLegendValues(isMobile ? 12 : 16, isMobile ? 105 : isTablet ? 94 : isDesktop1024 ? 101 : 101)}
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

const ContainerBar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const LegendAxisY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 36.75,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const ContainerBars = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  border: '1px soldid red',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 13,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));

const ContainerAxisX = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
  paddingLeft: 35,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 50,
    gap: 13,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    justifyContent: 'center',
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

const ContainerLine = styled('div')({
  marginLeft: 32,
});

const LegendAxisYItemContainer = styled('div')({});

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

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
}));

const InsideBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#D1DEE6' : '#47616f80',
}));
