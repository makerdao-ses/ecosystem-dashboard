import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const BudgetTransitionChart: React.FC = () => {
  const { isLight } = useThemeContext();
  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));

  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const isDesktop1194 = useMediaQuery(lightTheme.breakpoints.between('desktop_1194', 'desktop_1280'));

  const barWidth = isMobile ? 16 : isTablet ? 32 : isDesktop1194 ? 48 : 56;

  const barBorderRadius = isMobile ? 4 : 6;
  const itemStyleBottom = {
    borderRadius: [0, 0, barBorderRadius, barBorderRadius],
  };
  const itemStyleTop = {
    borderRadius: [barBorderRadius, barBorderRadius, 0, 0],
  };

  const options = {
    grid: {
      height: isMobile ? 222 : isTablet ? 312 : isDesktop1194 ? 392 : 392,
      width: isMobile ? 273 : isTablet ? 594 : isDesktop1194 ? 864 : 960,
      top: isMobile ? 15 : isTablet ? 6 : isDesktop1194 ? 6 : 11,
      right: isMobile ? 6 : isTablet ? 7 : 4,
    },
    xAxis: {
      type: 'category',
      data: [
        `Q1${isMobile ? '' : '’22'}`,
        `Q2${isMobile ? '' : '’22'}`,
        `Q3${isMobile ? '' : '’22'}`,
        `Q4${isMobile ? '' : '’22'}`,
        `Q1${isMobile ? '' : '’23'}`,
        `Q2${isMobile ? '' : '’23'}`,
        `Q3${isMobile ? '' : '’23'}`,
        `Q4${isMobile ? '' : '’23'}`,
        `Q1${isMobile ? '' : '’24'}`,
        `Q2${isMobile ? '' : '’24'}`,
        `Q3${isMobile ? '' : '’24'}`,
        `Q4${isMobile ? '' : '’24'}`,
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
        margin: isMobile || isTablet ? 16 : 18,
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        formatter: function (value: string) {
          if (isMobile && value.startsWith('Q1')) {
            return `{bgImg|${value}}`;
          }
          return value;
        },
        rich: {
          bgImg: {
            verticalAlign: 'top',
            color: '#139D8D',
            padding: [1, 4, 7, 4],
            fontFamily: 'Inter, sans-serif',
            fontSize: upTable ? 12 : 9,
            lineHeight: upTable ? 15 : 11,
            interval: 0,
            backgroundColor: {
              image: isLight ? '/assets/img/endgame/year_indicator.svg' : '/assets/img/endgame/year_indicator.svg',
            },
          },
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 13 : isTablet ? 22 : 28,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? '#231536' : '#EDEFFF',
        fontSize: isMobile ? 10 : isTablet ? 12 : 14,
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
        name: 'Legacy Maker Budget - Budget Cap',
        data: [
          {
            value: 200000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000.5,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 180000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
          {
            value: 150000,
            itemStyle: itemStyleBottom,
          },
        ],
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth,
        itemStyle: {
          color: isLight ? '#FBCC5F' : 'red',
        },
      },
      {
        name: 'All Endgame Budgets - Budget Cap',
        data: [
          {
            value: 150000,
            itemStyle: itemStyleTop,
          },
          {
            value: 100000,
            itemStyle: itemStyleTop,
          },
          {
            value: 150000,
            itemStyle: itemStyleTop,
          },
          {
            value: 150000,
            itemStyle: itemStyleTop,
          },
          {
            value: 100000,
            itemStyle: itemStyleTop,
          },
          {
            value: 150000,
            itemStyle: itemStyleTop,
          },
          {
            value: 15000,
            itemStyle: itemStyleTop,
          },
          {
            value: 13000,
            itemStyle: itemStyleTop,
          },
          {
            value: 15000,
            itemStyle: itemStyleTop,
          },
          {
            value: 600000,
            itemStyle: itemStyleTop,
          },
          {
            value: 800000,
            itemStyle: itemStyleTop,
          },
          {
            value: 150000,
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

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        <YearsContainer>
          <Year isLight={isLight}>2022</Year>
          <Year isLight={isLight}>2023</Year>
          <Year isLight={isLight}>2024</Year>
        </YearsContainer>
      </ChartContainer>
      <LegendContainer>
        <LegendItem isLight={isLight} variant="yellow">
          Legacy Maker Budget - Budget Cap
        </LegendItem>
        <LegendItem isLight={isLight} variant="green">
          All Endgame Budgets - Budget Cap
        </LegendItem>
      </LegendContainer>
    </Wrapper>
  );
};

export default BudgetTransitionChart;

const Wrapper = styled.div({
  width: '100%',
});

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 327,
  height: 271,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 661,
    height: 350,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 932,
    height: 431,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 436,
  },
});

const YearsContainer = styled.div({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  gap: 64,
  bottom: -20,
  left: 45,

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const Year = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#139D8D' : 'red',
  fontSize: 11,
  lineHeight: 'normal',
}));

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  width: 'fit-content',
  margin: '47px auto 0',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    gap: 64,
    marginTop: 39,
  },
});

const LegendItem = styled.div<WithIsLight & { variant: 'yellow' | 'green' }>(({ isLight, variant }) => ({
  position: 'relative',
  fontSize: 11,
  lineHeight: 'normal',
  color: isLight ? '#708390' : 'red',
  marginLeft: 13,

  '&::before': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 12,
    top: 3,
    left: -12,
    backgroundColor: isLight ? (variant === 'yellow' ? '#FBCC5F' : '#2DC1B1') : variant === 'yellow' ? 'red' : 'blue',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginLeft: 20,

    '&::before': {
      width: 12,
      height: 12,
      top: 5,
      left: -20,
    },
  },
}));
