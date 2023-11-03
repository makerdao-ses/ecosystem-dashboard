import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useRef } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';
interface BreakdownChartProps {
  year: string;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({ year }) => {
  const { isLight } = useThemeContext();
  const chartRef = useRef<EChartsOption | null>(null);
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const barWidth = isMobile ? 16 : isTablet ? 40 : isDesktop1024 ? 40 : 56;

  const barBorderRadius = isMobile ? 4 : 6;
  const itemStyleBottom = {
    borderRadius: [0, 0, barBorderRadius, barBorderRadius],
  };
  const itemStyleTop = {
    borderRadius: [barBorderRadius, barBorderRadius, 0, 0],
  };
  const itemStyleFull = {
    borderRadius: [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius],
  };

  const xAxisStyles = {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    color: isLight ? '#708390' : 'red',
    fontWeight: 600,
    fontSize: upTable ? 12 : 9,
    verticalAlign: 'top',
    interval: 0,
  };

  const options: EChartsOption = {
    grid: {
      height: isMobile ? 192 : isTablet ? 390 : isDesktop1024 ? 392 : isDesktop1280 ? 392 : 392,
      width: isMobile ? 304 : isTablet ? 630 : isDesktop1024 ? 678 : isDesktop1280 ? 955 : 955,
      top: isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      right: isMobile ? 2 : isTablet ? 7 : isDesktop1024 ? 50 : isDesktop1280 ? 4 : 4,
    },
    xAxis: {
      type: 'category',
      data: [
        isMobile ? 'J' : 'JAN',
        isMobile ? 'F' : 'FEB',
        isMobile ? 'M' : 'MAR',
        isMobile ? 'A' : 'APR',
        isMobile ? 'M' : 'MAY',
        isMobile ? 'J' : 'JUN',
        isMobile ? 'J' : 'JUL',
        isMobile ? 'A' : 'AUG',
        isMobile ? 'S' : 'SEP',
        isMobile ? 'O' : 'OCT',
        isMobile ? 'N' : 'NOV',
        isMobile ? 'D' : 'DEC',
      ],
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        symbolOffset: 'left',
        lineStyle: {
          color: 'transparent',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: isMobile ? 12 : isTablet ? 18 : isDesktop1024 ? 20 : isDesktop1280 ? 16 : 16,
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,

        formatter: function (value: string) {
          if (isMobile) {
            return value;
          }
          return `{month|${value}}\n{year|${year}}`;
        },
        rich: {
          month: xAxisStyles,
          year: xAxisStyles,
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 10 : isTablet ? 22 : isDesktop1024 ? 32 : isDesktop1280 ? 20 : 20,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? '#231536' : '#EDEFFF',
        fontSize: isMobile ? 10 : isTablet ? 14 : 14,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,
      },
      verticalAlign: 'middle',
      height: upTable ? 15 : 12,

      type: 'value',
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: isLight ? '#31424E' : '#D8E0E3',
          width: 0.25,
        },
      },
    },
    series: [
      {
        name: 'Endgame Atlas',
        data: [
          {
            value: 1450000,
            itemStyle: itemStyleFull,
          },
          {
            value: 1500000,
            itemStyle: itemStyleFull,
          },
          {
            value: 1550000,
            itemStyle: itemStyleFull,
          },
          {
            value: 1300000,
            itemStyle: itemStyleFull,
          },
          {
            value: 1400000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 1280000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 640000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 320000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 160000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 80000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 25000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 10000,
            itemStyle: itemStyleBottom,
          },
        ],
        type: 'bar',
        stack: 'x',
        barWidth,
        showBackground: false,

        itemStyle: {
          color: isLight ? '#F99374' : 'red',
        },
      },
      {
        name: 'Endgame Scopes',
        data: [
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 100000,
            itemStyle: itemStyleTop,
          },
          {
            value: 250000,
            itemStyle: itemStyleTop,
          },
          {
            value: 900000,
            itemStyle: itemStyleTop,
          },
          {
            value: 1250000,
            itemStyle: itemStyleTop,
          },
          {
            value: 1300000,
          },
          {
            value: 1400000,
          },
          {
            value: 1400000,
          },
          {
            value: 1500000,
          },
        ],
        type: 'bar',
        stack: 'x',
        barWidth,
        showBackground: false,

        itemStyle: {
          color: isLight ? '#447AFB' : 'red',
        },
      },
      {
        name: 'MakerDAO Legacy',
        data: [
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 0,
            itemStyle: itemStyleTop,
          },
          {
            value: 175000,
            itemStyle: itemStyleTop,
          },
          {
            value: 180000,
            itemStyle: itemStyleTop,
          },
          {
            value: 220000,
            itemStyle: itemStyleTop,
          },
          {
            value: 200000,
            itemStyle: itemStyleTop,
          },
        ],
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth,
        itemStyle: {
          color: isLight ? '#2DC1B1' : 'red',
        },
      },
    ],
  };

  const onLegendItemHover = (legendName: string) => () => {
    const chartInstance = chartRef?.current.getEchartsInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesIndex = options.series.findIndex((series: any) => series.name === legendName);
    if (seriesIndex !== -1) {
      chartInstance.dispatchAction({
        type: 'highlight',
        seriesName: options.series[seriesIndex].name,
      });
    }
  };

  const onLegendItemLeave = () => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
    });
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={chartRef}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {isMobile && (
          <YearXAxis isLight={isLight}>
            <YearText isLight={isLight}>{year}</YearText>
          </YearXAxis>
        )}
        <LegendContainer>
          <LegendItem
            isLight={isLight}
            onMouseEnter={onLegendItemHover('Endgame Atlas')}
            onMouseLeave={onLegendItemLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#F99374' : 'red'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#F99374' : 'red'} />
            </svg>
            Endgame Atlas
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={onLegendItemHover('Endgame Scopes')}
            onMouseLeave={onLegendItemLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#447AFB' : 'red'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#447AFB' : 'red'} />
            </svg>
            Endgame Scopes
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={onLegendItemHover('MakerDAO Legacy')}
            onMouseLeave={onLegendItemLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#2DC1B1' : 'red'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#2DC1B1' : 'red'} />
            </svg>
            MakerDAO Legacy
          </LegendItem>
        </LegendContainer>
      </ChartContainer>
    </Wrapper>
  );
};

export default BreakdownChart;

const Wrapper = styled.div({
  marginTop: 32,
});

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',

  maxWidth: 343,
  height: 347,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    maxWidth: 756,
    height: 510,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 848,
    height: 508,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 508,
  },
});

const YearXAxis = styled.div<WithIsLight>(({ isLight }) => {
  const border = `1px solid ${isLight ? '#6EDBD0' : 'red'}`;

  return {
    position: 'absolute',
    bottom: 107,
    left: 40,
    right: 5,
    height: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: 'normal',
  color: isLight ? '#139D8D' : 'red',
  position: 'absolute',
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: isLight ? '#FFFFFF' : 'red',
  textAlign: 'center',
}));

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingLeft: 8,
  paddingRight: 6,
  gap: 22,
  position: 'absolute',
  bottom: 30,
  rowGap: 10,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 2,
    paddingLeft: 'revert',
    paddingRight: 'revert',
    flexWrap: 'revert',
    position: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 60,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : 'red',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
  },
}));
