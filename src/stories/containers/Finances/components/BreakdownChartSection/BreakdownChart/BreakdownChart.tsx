import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { formatterBreakDownChart, getGranularity } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { formatNumber, replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { setBorderRadiusForSeries } from '../utils';
import type { BarChartSeries, BreakdownChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';

interface BreakdownChartProps {
  year: string;
  budgets: Budget[];
  selectedGranularity: AnalyticGranularity;
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined;
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined;
  series: BreakdownChartSeriesData[];
  refBreakDownChart: React.RefObject<EChartsOption | null>;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({ year, refBreakDownChart, series, selectedGranularity }) => {
  const { isLight } = useThemeContext();
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const barBorderRadius = isMobile ? 4 : 6;

  const [visibleSeries, setVisibleSeries] = useState<BreakdownChartSeriesData[]>(series);
  const [legends, setLegends] = useState<BreakdownChartSeriesData[]>(series);
  const showLineYear =
    isMobile && (selectedGranularity as string) !== 'Quarterly' && (selectedGranularity as string) !== 'Annually';
  useEffect(() => {
    setVisibleSeries(series);
    setLegends(series);
  }, [series]);

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
    tooltip: {
      show: !isMobile,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      padding: 0,
      borderWidth: 1,
      borderColor: isLight ? '#D4D9E1' : '#231536',
      formatter: function (params: BarChartSeries[]) {
        return `
        <div style="background-color:${
          isLight ? '#fff' : '#000A13'
        };padding:16px;minWidth:194px;overflow:auto;border-radius:3px;">
          <div style="margin-bottom:16px;color:${isLight ? '#000' : '#EDEFFF'};">${params?.[0]?.name}</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${params
              .reverse()
              .map(
                (item) => `<div style="display: flex;align-items:center;gap: 6px">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="${isMobile ? 13 : 16}"
                height="${isMobile ? 13 : 16}"
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
              </svg>
              <span style="font-weight:bold;color:${isLight ? '#231536' : '#9FAFB9'};"> ${item.seriesName}:</span>
              ${formatNumber(item.value)}</div>`
              )
              .join('')}
          </div>
        </div>
        `;
      },
    },
    grid: {
      height: isMobile ? 192 : isTablet ? 390 : isDesktop1024 ? 392 : isDesktop1280 ? 392 : 392,
      width: isMobile ? 304 : isTablet ? 630 : isDesktop1024 ? 678 : isDesktop1280 ? 955 : 955,
      top: isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      right: isMobile ? 2 : isTablet ? 7 : isDesktop1024 ? 50 : isDesktop1280 ? 4 : 4,
    },
    xAxis: {
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
          const formatted = formatterBreakDownChart(selectedGranularity, isMobile, year, value);
          return formatted;
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
    series: visibleSeries,
  };

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

  const toggleSeriesVisibility = (seriesName: string) => {
    const updateSeries = visibleSeries.map((item) => {
      if (item.name === seriesName) {
        const isVisible = !item.isVisible;
        return {
          ...item,
          isVisible,
          // Add border 0 when element is hiddend
          data: isVisible
            ? item.dataOriginal
            : item.data.map(() => ({
                value: 0,
                itemStyle: { borderRadius: [0, 0, 0, 0] },
              })),
        };
      }
      return item;
    });

    // iterate through legends
    const newLegend = legends.map((item) => {
      if (item.name === seriesName) {
        const isVisible = !item.isVisible;
        return {
          ...item,
          isVisible,
          itemStyle: {
            ...item.itemStyle,
            color: isVisible ? item?.itemStyle.colorOriginal : 'rgb(204, 204, 204)',
          },

          data: item.dataOriginal || [],
        };
      }
      return item;
    });
    const recalculatedSeries = setBorderRadiusForSeries(updateSeries, barBorderRadius);
    setVisibleSeries(recalculatedSeries);
    setLegends(newLegend);
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
        {legends.map((element) => (
          <LegendItem
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover(element.name)}
            onMouseLeave={() => onLegendItemLeave(element.name)}
            onClick={() => toggleSeriesVisibility(element.name)}
          >
            <SVGContainer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 13 : 16}
                height={isMobile ? 13 : 16}
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.color} />
                <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.color} />
              </svg>
            </SVGContainer>
            {element.name}
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
