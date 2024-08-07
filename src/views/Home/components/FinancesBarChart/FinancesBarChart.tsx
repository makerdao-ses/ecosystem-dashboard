import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { usLocalizedNumber } from '@/core/utils/humanization';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
import type { BarChartSeries } from '@/views/Finances/utils/types';
import { getCorrectLabelForToolTip } from '../../utils/utils';
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
    tooltip: {
      show: true,
      trigger: 'axis',
      borderRadius: 12,
      backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: theme.palette.isLight ? '#D4D9E1' : '#231536',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
      formatter: function (params: BarChartSeries[]) {
        const shortAmount = params.length > 10;
        const flexDirection = shortAmount ? 'row' : 'column';
        const gap = 8;
        return `
          <div style="background-color:${
            theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
          };box-shadow:${
          theme.palette.isLight ? theme.fusionShadows.graphShadow : 'none'
        };padding:8px 16px 8px 16px;min-width:194px;overflow:auto;border-radius:12px; font-family:Inter ,sans-serif">
            <div style="margin-bottom:8px;font-size:16px;font-weight:600;color:#8391A7";line-height:24px;>${
              params?.[0]?.name
            }</div>
            <div style="display:flex;flex-direction:${flexDirection};gap:${gap}px;min-width:194px;max-width:450px;flex-wrap:wrap;">
              ${params
                .reverse()
                .map(
                  (item) =>
                    `<div style="display: flex;align-items:center;gap: 4px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                      isMobile ? 13 : 16
                    }" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                  </svg>
                  <span style="font-size:14px;font-weight:600;line-height:22px;color:${
                    theme.palette.isLight ? '#9DA6B9' : '#B6BCC2'
                  };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${getCorrectLabelForToolTip(
                      item.seriesName
                    )}:</span>
                  <span style="font-size:14px;margin-left:4px;font-weight:600;line-height:22px;color:${
                    theme.palette.isLight ? '#252A34' : '#EDEFFF'
                  };">${usLocalizedNumber(item.value, 2)}</span>
                </div>`
                )
                .join('')}
            </div>
          </div>
          `;
      },
    },
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
