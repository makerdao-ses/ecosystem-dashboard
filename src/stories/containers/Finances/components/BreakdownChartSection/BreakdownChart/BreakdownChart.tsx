import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useRef } from 'react';
import useBreakdownChart from '../useBreakdownChart';
import type { SeriesBreakDownChart, ValueSeriesBreakdownChart } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';
interface IsShowSeries {
  'Endgame Atlas': boolean;
  'Endgame Scopes': boolean;
  'MakerDAO Legacy': boolean;
}
interface BreakdownChartProps {
  year: string;
  className?: string;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({ year, className }) => {
  const { isShowSeries, setIsShowSeries, seriesBreakDownChartWithColors, legendBreakDownChart } = useBreakdownChart();

  const { isLight } = useThemeContext();
  const chartRef = useRef<EChartsOption | null>(null);
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));

  const xAxisStyles = {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    color: '#708390',
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
    series: seriesBreakDownChartWithColors as SeriesBreakDownChart[],
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

  const handleOnclick = (legendName: string, data: ValueSeriesBreakdownChart[]) => () => {
    const chartInstance = chartRef?.current.getEchartsInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const seriesIndex = options.series.findIndex((series: any) => series.name === legendName);
    if (seriesIndex !== -1) {
      const currentSeries = options.series[seriesIndex];
      setIsShowSeries({
        ...isShowSeries,
        [legendName]: !isShowSeries[legendName as keyof IsShowSeries],
      });

      currentSeries.visible = !currentSeries.visible;

      if (!currentSeries.visible) {
        currentSeries.data = new Array<ValueSeriesBreakdownChart>(12).fill({
          value: 0,
          itemStyle: {
            borderRadius: [0, 0, 0, 0],
          },
        });
        chartInstance.setOption(options, true);
      } else {
        currentSeries.data = data;
      }
      chartInstance.setOption(options, true);
    }
  };
  return (
    <Wrapper>
      <ChartContainer className={className}>
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
      </ChartContainer>
      <LegendContainer>
        {legendBreakDownChart.map((legend) => (
          <LegendItem
            isLight={isLight}
            onMouseEnter={onLegendItemHover(legend.name)}
            onMouseLeave={onLegendItemLeave}
            onClick={handleOnclick(legend.name, legend.data)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={legend.color} />
              <circle cx="6.5" cy="6.5" r="4" fill={legend.color} />
            </svg>
            {legend.name}
          </LegendItem>
        ))}
      </LegendContainer>
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
  const border = `1px solid ${isLight ? '#6EDBD0' : '#1AAB9B'}`;

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
  color: isLight ? '#139D8D' : '#2DC1B1',
  position: 'absolute',
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
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
  marginTop: -78,
  rowGap: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    rowGap: 5,
    marginBottom: 2,
    marginTop: -24,
    paddingLeft: 'revert',
    paddingRight: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    rowGap: 5,
    marginTop: -22,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 60,
    rowGap: 5,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',
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
