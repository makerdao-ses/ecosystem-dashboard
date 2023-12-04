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
  newActuals: { value: number }[];
  newBudget: { value: number }[];
  newForecast: { value: number }[];
  newNetExpensesOffChain: { value: number }[];
  newNetExpensesOnChain: { value: number }[];
}

const MakerDAOChartMetrics: React.FC<BreakdownChartProps> = ({
  year,
  newActuals,
  newBudget,
  newForecast,
  newNetExpensesOnChain,
  newNetExpensesOffChain,
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
    grid: {
      height: isMobile ? 192 : isTablet ? 409 : isDesktop1024 ? 398 : isDesktop1280 ? 399 : 399,
      width: isMobile ? 304 : isTablet ? 645 : isDesktop1024 ? 704 : isDesktop1280 ? 955 : 955,
      top: isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      right: isMobile ? 2 : isTablet ? 0 : isDesktop1024 ? 36 : isDesktop1280 ? 4 : 4,
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
    series: [
      {
        name: 'Budget',
        data: newBudget,
        type: 'line',
        stack: 'Total',
        showBackground: false,
        itemStyle: {
          color: isLight ? '#F99374' : '#F77249',
        },
        isVisible: true,
      },
      {
        name: 'Forecast',
        data: newForecast,
        type: 'line',
        stack: 'Total',
        showBackground: false,
        itemStyle: {
          color: isLight ? '#447AFB' : '#447AFB',
        },
        isVisible: true,
      },
      {
        name: 'Actuals',
        data: newActuals,
        type: 'line',
        stack: 'Total',
        showBackground: false,
        itemStyle: {
          color: isLight ? '#2DC1B1' : '#1AAB9B',
        },
        isVisible: true,
      },
      {
        name: 'Net Expenses On-chain',
        data: newNetExpensesOnChain,
        type: 'line',
        stack: 'Total',
        showBackground: false,
        itemStyle: {
          color: isLight ? '#FBCC5F' : 'red',
        },
        isVisible: true,
      },
      {
        name: 'Net Expenses Off-chain',
        data: newNetExpensesOffChain,
        type: 'line',
        stack: 'Total',
        showBackground: false,
        itemStyle: {
          color: isLight ? '#7C6B95' : 'red',
        },
        isVisible: true,
      },
    ],
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

  const onLegendItemClick = (legendName: string, data: { value: number }[]) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    const seriesIndex: number = options.series.findIndex((s: { name: string }) => s.name === legendName);
    options.series[seriesIndex].isVisible = !options.series[seriesIndex].isVisible;
    options.series[seriesIndex].data = options.series[seriesIndex].isVisible ? data : [];
    chartInstance.setOption(options);
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
            onMouseEnter={() => onLegendItemHover('Budget')}
            onMouseLeave={() => onLegendItemLeave('Budget')}
            onClick={() => onLegendItemClick('Budget', newBudget)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#F99374' : '#F77249'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#F99374' : '#F77249'} />
            </svg>
            Budget
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover('Forecast')}
            onMouseLeave={() => onLegendItemLeave('Forecast')}
            onClick={() => onLegendItemClick('Forecast', newForecast)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#447AFB' : '#447AFB'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#447AFB' : '#447AFB'} />
            </svg>
            Forecast
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover('Actuals')}
            onMouseLeave={() => onLegendItemLeave('Actuals')}
            onClick={() => onLegendItemClick('Actuals', newActuals)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#2DC1B1' : '#1AAB9B'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#2DC1B1' : '#1AAB9B'} />
            </svg>
            Actuals
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover('Net Expenses On-chain')}
            onMouseLeave={() => onLegendItemLeave('Net Expenses On-chain')}
            onClick={() => onLegendItemClick('Net Expenses On-chain', newNetExpensesOnChain)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#FBCC5F' : 'red'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#FBCC5F' : 'red'} />
            </svg>
            Net Expenses On-chain
          </LegendItem>
          <LegendItem
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover('Net Expenses Off-chain')}
            onMouseLeave={() => onLegendItemLeave('Net Expenses Off-chain')}
            onClick={() => onLegendItemClick('Net Expenses Off-chain', newNetExpensesOffChain)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? 13 : 16}
              height={isMobile ? 13 : 16}
              viewBox="0 0 13 13"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke={isLight ? '#7C6B95' : 'red'} />
              <circle cx="6.5" cy="6.5" r="4" fill={isLight ? '#7C6B95' : 'red'} />
            </svg>
            {`${isMobile ? 'Net Expenses Off-chain' : 'Net Expenses Off-chain included'}`}
          </LegendItem>
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
