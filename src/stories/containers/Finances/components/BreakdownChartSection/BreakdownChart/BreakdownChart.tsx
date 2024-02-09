import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { createChartTooltip } from '@ses/containers/Finances/utils/chartTooltip';
import { formatterBreakDownChart, getGranularity, nameChanged } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo } from 'react';
import type { BreakdownChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';

interface BreakdownChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({
  year,
  refBreakDownChart,
  series,
  handleToggleSeries,
  selectedGranularity,
}) => {
  const { isLight } = useThemeContext();
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const showLineYear =
    isMobile && (selectedGranularity as string) !== 'Quarterly' && (selectedGranularity as string) !== 'Annually';

  const xAxisStyles = useMemo(
    () => ({
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      color: '#708390',
      fontWeight: 600,
      fontSize: upTable ? 12 : 9,
      verticalAlign: 'top',
      interval: 0,
    }),
    [upTable]
  );

  const options: EChartsOption = useMemo(
    () => ({
      tooltip: createChartTooltip(selectedGranularity, year, isLight, isMobile),
      grid: {
        height: isMobile ? 192 : isTablet ? 390 : isDesktop1024 ? 392 : isDesktop1280 ? 392 : 392,
        width: isMobile ? 304 : isTablet ? 630 : isDesktop1024 ? 678 : isDesktop1280 ? 955 : 955,
        top: isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
        right: isMobile ? 2 : isTablet ? 7 : isDesktop1024 ? 50 : isDesktop1280 ? 4 : 4,
      },
      xAxis: {
        show: true,
        type: 'category',
        data: getGranularity(selectedGranularity, isMobile),
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
            const formatted = formatterBreakDownChart(
              selectedGranularity as AnalyticGranularity,
              isMobile,
              year,
              value
            );
            return formatted;
          },
          rich: {
            month: xAxisStyles,
            year: xAxisStyles,
          },
        },
      },
      yAxis: {
        min: series.length === 0 ? 0 : null,
        max: series.length === 0 ? 1 : null,
        show: true,
        axisLabel: {
          show: true,
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
      series,
    }),
    [isDesktop1024, isDesktop1280, isLight, isMobile, isTablet, selectedGranularity, series, upTable, xAxisStyles, year]
  );

  useEffect(() => {
    // avoid to merge data when moving between levels
    const chartInstance = refBreakDownChart.current.getEchartsInstance();
    chartInstance.setOption(options, { notMerge: true });
  }, [options, refBreakDownChart]);

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = refBreakDownChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = refBreakDownChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    });
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={refBreakDownChart}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && (
          <YearXAxis isLight={isLight}>
            <YearText isLight={isLight}>{year}</YearText>
          </YearXAxis>
        )}
      </ChartContainer>
      <LegendContainer>
        {series.map((element, index) => (
          <LegendItem
            key={index}
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover(element.name)}
            onMouseLeave={() => onLegendItemLeave(element.name)}
            onClick={() => handleToggleSeries(element.name)}
          >
            <SVGContainer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 13 : 16}
                height={isMobile ? 13 : 16}
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.colorOriginal} />
                <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.colorOriginal} />
              </svg>
            </SVGContainer>
            {nameChanged(element.name)}
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
  height: 260,
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
    bottom: 20,
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
  rowGap: 14,
  marginTop: 10,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: -22,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 60,
    rowGap: 16,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
  },
}));

const SVGContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});
