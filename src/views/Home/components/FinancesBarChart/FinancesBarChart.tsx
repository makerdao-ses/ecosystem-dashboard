import { styled, useMediaQuery, useTheme } from '@mui/material';

import ReactECharts from 'echarts-for-react';

import useFinancesBarChart from './useFinancesBarChart';

import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

const FinancesBarChart: FC = () => {
  const { financesBarChartRef } = useFinancesBarChart();
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const series = [
    {
      data: [15, 20, 24, 49],
      type: 'bar',
      stack: 'a',
      name: 'psm',
      barWidth: isMobile ? 24 : isTablet ? 32 : 40,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
      markLine: {
        silent: true,
        lineStyle: {
          width: 2,
          color: theme.palette.colors.blue[900],
          cap: 'round',
        },
        symbol: ['none', 'none'],
        data: [
          [{ coord: [0, 10] }, { coord: [1, 10] }],
          [{ coord: [1, 20] }, { coord: [2, 20] }],
          [{ coord: [2, 35] }, { coord: [3, 35] }],
          [{ coord: [2, 60] }, { coord: [3, 60] }],
        ],
      },
    },
    {
      data: [10, 10, 10, 30],
      type: 'bar',
      stack: 'a',
      name: 'liquidationIncome',
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[500] : theme.palette.colors.green[700],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: [12, 12, 14, 20],
      type: 'bar',
      stack: 'a',
      name: 'fees',
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[300] : theme.palette.colors.green[500],
        borderRadius: [8, 8, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: [13, 20, 22, 22],
      type: 'bar',
      stack: 'b',
      name: 'mkrVesting',
      barWidth: isMobile ? 24 : isTablet ? 32 : 40,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: [5, 7, 8, 8],
      type: 'bar',
      stack: 'b',
      name: 'daiSpent',
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.red[500] : theme.palette.colors.red[700],
        borderRadius: [8, 8, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
  ];

  const options: EChartsOption = {
    grid: {
      top: 8,
      right: 0,
      bottom: 20,
      left: isMobile ? 40 : 49,
    },
    xAxis: {
      data: ['2021', '2022', '2023', '2024'],
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
      axisPointer: {
        show: !isMobile,
        type: 'shadow',
        label: {
          show: false,
        },
      },
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
        formatter: (value: number) => `${value} M`,
      },
    },
    series,
  };

  return (
    <Container>
      <ReactECharts
        ref={financesBarChartRef}
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

export default FinancesBarChart;

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 216,
  marginTop: 8,

  '& svg path:nth-of-type(39)': {
    transform: 'translateX(-5%)',
  },

  '& svg path:nth-of-type(40), & svg path:nth-of-type(41)': {
    transform: 'translateX(-10%)',
  },

  '& svg path:nth-of-type(42)': {
    transform: 'translateX(12.5%)',
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 385,
    height: 253,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 526,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 449,
    height: 360,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 480,
  },
}));
