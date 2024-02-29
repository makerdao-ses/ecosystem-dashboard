import styled from '@emotion/styled';

import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useRef } from 'react';
import { formatterWaterfallChart, getChartAxisLabelByGranularity } from '../../utils/utils';
import LegendItemChart from '../LegendItemChart/LegendItemChart';
import LineYearBorderBottomChart from '../LineYearBorderBottomChart/LineYearBorderBottomChart';
import type { LegendItemsWaterfall, LineWaterfall, WaterfallChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  legends: LegendItemsWaterfall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: (WaterfallChartSeriesData | LineWaterfall)[];
}

const WaterfallChart: React.FC<Props> = ({ legends, year, selectedGranularity, series }) => {
  const { isLight } = useThemeContext();
  const refWaterfallChart = useRef<EChartsOption | null>(null);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const showLineYear = isMobile && selectedGranularity === 'monthly';

  const xAxisStyles = useMemo(
    () => ({
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: upTable ? 12 : 9,
      verticalAlign: 'top',
      interval: 0,
      padding: [0, 0, 3, 0],
    }),
    [upTable]
  );

  const xYearStyles = useMemo(
    () => ({
      ...xAxisStyles,
      padding: [0, 0, 0, 0],
    }),
    [xAxisStyles]
  );

  const startStyles = useMemo(
    () => ({
      ...xAxisStyles,
      color: isLight ? (isMobile ? '#231536' : '#434358') : '#B6BCC2',
    }),
    [xAxisStyles, isLight, isMobile]
  );

  const startYearStyles = useMemo(
    () => ({
      ...xYearStyles,
      color: isLight ? (isMobile ? '#231536' : '#434358') : '#B6BCC2',
    }),
    [xYearStyles, isLight, isMobile]
  );

  const options: EChartsOption = useMemo(
    () => ({
      grid: {
        top: isMobile ? 16 : isTablet ? 18 : isDesktop1024 ? 20 : isDesktop1280 ? 22 : 22,
        left: isMobile ? 36 : isTablet ? 68 : isDesktop1024 ? 66 : isDesktop1280 ? 66 : isDesktop1440 ? 68 : 65,
        right: isMobile ? 2 : isTablet ? -2 : isDesktop1024 ? -2 : isDesktop1280 ? -2 : isDesktop1440 ? 1 : 1,
        height: isMobile ? 185 : isTablet ? 385 : isDesktop1024 ? 384 : isDesktop1280 ? 382 : isDesktop1440 ? 380 : 380,
      },
      xAxis: {
        type: 'category',
        data: getChartAxisLabelByGranularity(selectedGranularity, isMobile, true),
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
          margin: isMobile ? 16 : isTablet ? 24 : isDesktop1024 ? 24 : isDesktop1280 ? 24 : isDesktop1440 ? 26 : 24,
          color: isLight ? '#B6BCC2' : '#546978',
          align: 'center',
          fontFamily: 'Inter,san-serif',
          fontWeight: isMobile ? 400 : 600,
          fontSize: upTable ? 12 : 9,
          height: upTable ? 15 : 11,
          interval: 0,
          formatter: function (value: string, index: number) {
            const formatted = formatterWaterfallChart(selectedGranularity, isMobile, year, value, index);
            return formatted;
          },
          rich: {
            month: xAxisStyles,
            year: xYearStyles,
            start: startStyles,
            startYear: startYearStyles,
          },
        },
      },
      yAxis: {
        min: 0,
        axisLabel: {
          padding: isMobile
            ? [0, 0, 0, 2]
            : isTablet
            ? [0, 14, 0, 0]
            : isDesktop1024
            ? [0, 12, 0, 0]
            : isDesktop1280
            ? [0, 6, 0, 0]
            : isDesktop1440
            ? [0, 12, 0, 0]
            : [0, 12, 0, 0],
          formatter: function (value: number, index: number) {
            if (index === 0) {
              return value.toString();
            }
            return replaceAllNumberLetOneBeforeDot(value);
          },
          color: isLight ? '#231536' : '#D2D4EF',
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
      series,
    }),
    [
      isDesktop1024,
      isDesktop1280,
      isDesktop1440,
      isLight,
      isMobile,
      isTablet,
      selectedGranularity,
      series,
      startStyles,
      startYearStyles,
      upTable,
      xAxisStyles,
      xYearStyles,
      year,
    ]
  );

  useEffect(() => {
    // avoid to merge data for lines
    const chartInstance = refWaterfallChart?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options]);

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={refWaterfallChart}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && <LineYearBorderBottomChart year={year} />}
      </ChartContainer>
      <LegendContainer>
        {legends?.map((legend, index) => (
          <LegendItemChart isSvg={false} key={index} title={legend.title} color={legend.color} />
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default WaterfallChart;

const Wrapper = styled.div({
  width: '100%',
});

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 343,
  height: 275,
  marginLeft: 'auto',
  marginRight: 'auto',

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 456,
    maxWidth: 700,
    width: 7040,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 954,
    width: 954,
    height: 508,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1185,
    width: 1185,
    height: 508,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1192,
    height: 508,
    width: 1192,
  },
});

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingLeft: 2,
  gap: 32,
  marginTop: -2,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    paddingLeft: 0,
    marginTop: 42,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    marginTop: -12,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 64,
    marginTop: -12,
    marginLeft: -6,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 64,
    marginTop: -12,
    marginLeft: -6,
  },
});
