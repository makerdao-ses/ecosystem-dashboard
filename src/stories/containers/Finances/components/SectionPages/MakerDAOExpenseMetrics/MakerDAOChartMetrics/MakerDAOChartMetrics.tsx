import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { createChartTooltip } from '@ses/containers/Finances/utils/chartTooltip';
import { breakdownChartMonthly, breakdownChartQuarterlyMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useRef } from 'react';
import type { LineChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';
interface BreakdownChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: LineChartSeriesData[];
  handleToggleSeries: (series: string) => void;
}

const MakerDAOChartMetrics: React.FC<BreakdownChartProps> = ({
  year,
  selectedGranularity,
  series,
  handleToggleSeries,
}) => {
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
    tooltip: createChartTooltip(selectedGranularity, year, isLight, isMobile),
    grid: {
      height: isMobile ? 192 : isTablet ? 409 : isDesktop1024 ? 398 : isDesktop1280 ? 399 : 399,
      width: isMobile ? 304 : isTablet ? 645 : isDesktop1024 ? 704 : isDesktop1280 ? 955 : 955,
      top: isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      right: isMobile ? 2 : isTablet ? 0 : isDesktop1024 ? 36 : isDesktop1280 ? 4 : 4,
    },
    xAxis: {
      type: 'category',
      data:
        selectedGranularity === 'monthly'
          ? breakdownChartMonthly(isMobile)
          : selectedGranularity === 'quarterly'
          ? breakdownChartQuarterlyMetric()
          : [''],
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
        margin: isMobile ? 12 : isTablet ? 12 : isDesktop1024 ? 26 : isDesktop1280 ? 20 : 20,
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
          if (selectedGranularity === 'monthly') {
            return `{value|${value}}\n{year|${year}}`;
          }
          if (selectedGranularity === 'quarterly') {
            return `{value|${value}} {year|${year}}`;
          }
          return `{year|${year}}`;
        },
        rich: {
          value: xAxisStyles,
          year: xAxisStyles,
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 10 : isTablet ? 12 : isDesktop1024 ? 26 : isDesktop1280 ? 20 : 20,
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
  };

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
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
          {series.map((seriesItem: LineChartSeriesData) => (
            <LegendItem
              isLight={isLight}
              onMouseEnter={() => onLegendItemHover(seriesItem.name)}
              onMouseLeave={() => onLegendItemLeave(seriesItem.name)}
              onClick={() => handleToggleSeries(seriesItem.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 13 : 16}
                height={isMobile ? 13 : 16}
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke={seriesItem.itemStyle.color} />
                <circle cx="6.5" cy="6.5" r="4" fill={seriesItem.itemStyle.color} />
              </svg>
              {seriesItem.name === 'Net Expenses Off-chain'
                ? `${isMobile ? 'Net Expenses Off-chain' : 'Net Expenses Off-chain included'}`
                : seriesItem.name}
            </LegendItem>
          ))}
        </LegendContainer>
      </ChartContainer>
    </Wrapper>
  );
};

export default MakerDAOChartMetrics;

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
  marginTop: -4,

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
  color: isLight ? '#139D8D' : '#1AAB9B',
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
  flex: 1,
  gap: 24,
  position: 'absolute',
  bottom: 28,
  rowGap: 14,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 42,
    bottom: -50,
    rowGap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: -20,
    gap: 40,
    minWidth: 940,
    bottom: -12,
    justifyContent: 'start',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 65,
    marginLeft: 22,
    marginBottom: 36,
    bottom: -50,
    minWidth: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 65,
    marginLeft: 22,
    marginBottom: 36,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  lineHeight: 'normal',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
  },
}));
