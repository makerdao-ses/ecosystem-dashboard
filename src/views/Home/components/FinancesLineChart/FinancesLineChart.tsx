import { styled, useMediaQuery, useTheme } from '@mui/material';

import ReactECharts from 'echarts-for-react';

import useFinancesLineChart from './useFinancesLineChart';

import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

const FinancesLineChart: FC = () => {
  const { financesLineChartRef } = useFinancesLineChart();
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const series = [
    {
      type: 'line',
      name: 'Legacy Other',
      stack: 'a',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [260, 220, 190, 160, 120, 80, 50],
    },
    {
      type: 'line',
      name: 'Legacy Core Units',
      stack: 'a',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [480, 400, 300, 200, 140, 100, 40],
    },
    {
      type: 'line',
      name: 'Governance Scope',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
    },
    {
      type: 'line',
      name: 'Stability',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 10, 80, 160, 100, 120, 140, 100, 50, 50, 50],
    },
    {
      type: 'line',
      name: 'Support Scope',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
    },
    {
      type: 'line',
      name: 'Protocol Scope',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
    },
    {
      type: 'line',
      name: 'Accessibility Scope',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 20, 80, 160, 150, 160, 140, 100, 50, 50, 80],
    },
    {
      type: 'line',
      name: 'Atlas Immutable Budget',
      stack: 'b',
      stackStrategy: 'all',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      showSymbol: false,
      data: [null, null, null, null, null, null, 30, 80, 160, 150, 160, 140, 100, 180, 50, 100],
    },
  ];

  const options: EChartsOption = {
    grid: {
      top: 8,
      right: 10,
      bottom: 20,
      left: isMobile ? 40 : 45,
    },
    xAxis: {
      data: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
      axisLine: {
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 4,
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
      },
      boundaryGap: false,
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisLabel: {
        margin: 8,
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
        formatter: (value: number) => `${value} K`,
      },
    },
    series,
  };

  return (
    <Container>
      <ReactECharts
        ref={financesLineChartRef}
        option={options}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </Container>
  );
};

export default FinancesLineChart;

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 216,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    width: 500,
    height: 253,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 540,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 480,
    height: 360,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 520,
  },
}));
