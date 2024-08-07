import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
import useFinancesBarChart from './useFinancesBarChart';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';
import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

interface FinancesBarChartProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
}

const FinancesBarChart: FC<FinancesBarChartProps> = ({ revenueAndSpendingData }) => {
  const { financesBarChartRef } = useFinancesBarChart();
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const { chartSeries, makerLineData } = useMemo(() => {
    const series: Record<string, number[]> = {
      psm: [],
      liquidationIncome: [],
      fees: [],
      mkrVesting: [],
      daiSpent: [],
    };

    const makerLineData = [] as { coord: [number, number] }[][];

    const years = Object.keys(revenueAndSpendingData)
      // limit the years to 2021-2024 as there's no UI space for more years
      .filter((year) => Number(year) >= 2021 && Number(year) <= 2024)
      .sort((a, b) => Number(a) - Number(b));

    years.forEach((year, index) => {
      const record = revenueAndSpendingData[year];

      series.psm.push(record.psm);
      series.liquidationIncome.push(record.liquidationIncome);
      series.fees.push(record.fees);
      series.mkrVesting.push(record.mkrVesting);
      series.daiSpent.push(record.daiSpent);

      makerLineData.push([
        { coord: [index, revenueAndSpendingData[year].annualProfit] },
        { coord: [index + 1, revenueAndSpendingData[year].annualProfit] },
      ]);
    });

    return {
      chartSeries: series,
      makerLineData,
    };
  }, [revenueAndSpendingData]);

  const barWidth = isMobile ? 24 : isTablet ? 32 : 40;

  const series = [
    {
      data: chartSeries.psm,
      type: 'bar',
      stack: 'revenue',
      name: 'psm',
      barWidth,
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
          margin: [0 - 8, 0, -8],
          width: 2,
          color: theme.palette.colors.blue[900],
          type: 'dashed',
          cap: 'round',
        },
        symbol: ['none', 'none'],
        data: makerLineData,
      },
    },
    {
      data: chartSeries.liquidationIncome,
      type: 'bar',
      stack: 'revenue',
      name: 'liquidationIncome',
      barWidth,
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
      data: chartSeries.fees,
      type: 'bar',
      stack: 'revenue',
      name: 'fees',
      barWidth,
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
      data: chartSeries.mkrVesting,
      type: 'bar',
      stack: 'spending',
      name: 'mkrVesting',
      barWidth,
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
      data: chartSeries.daiSpent,
      type: 'bar',
      stack: 'spending',
      name: 'daiSpent',
      barWidth,
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
      type: 'category',
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
      type: 'value',
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
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value, true);
        },
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
