import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { usLocalizedNumber } from '@/core/utils/humanization';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
import type { BarChartSeries } from '@/views/Finances/utils/types';
import useFinancesLineChart from './useFinancesLineChart';
import type { FormattedFinancesData, MetricKey } from '../../api/finances';
import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

interface FinancesLineChartProps {
  financesData: FormattedFinancesData;
  selectedMetric: MetricKey;
}

const FinancesLineChart: FC<FinancesLineChartProps> = ({ financesData, selectedMetric }) => {
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
      data: financesData[selectedMetric].legacyOthers,
      itemStyle: {
        color: theme.palette.colors.charcoal[300],
      },
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
      data: financesData[selectedMetric].legacyCoreUnits,
      itemStyle: {
        color: theme.palette.colors.charcoal[200],
      },
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
      data: financesData[selectedMetric].governanceScope,
      itemStyle: {
        color: theme.palette.colors.fusion[400],
      },
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
      data: financesData[selectedMetric].stability,
      itemStyle: {
        color: theme.palette.colors.blue[500],
      },
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
      data: financesData[selectedMetric].support,
      itemStyle: {
        color: theme.palette.colors.red[500],
      },
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
      data: financesData[selectedMetric].protocol,
      itemStyle: {
        color: theme.palette.colors.green[500],
      },
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
      data: financesData[selectedMetric].accessibility,
      itemStyle: {
        color: theme.palette.colors.purple[500],
      },
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
      data: financesData[selectedMetric].immutable,
      itemStyle: {
        color: theme.palette.colors.orange[500],
      },
    },
  ];

  const options: EChartsOption = {
    grid: {
      top: 8,
      right: 10,
      bottom: 20,
      left: isMobile ? 40 : 45,
    },
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
                  };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${
                      item.seriesName
                    }:</span>
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
        formatter: (value: number, index: number) => {
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
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={financesLineChartRef}
          option={options}
          style={{
            width: '100%',
            height: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
      </ChartContainer>

      <LegendContainer>
        {series.map((item) => (
          <LegendItem key={item.name}>
            <Dot color={item.itemStyle.color} />
            {item.name}
          </LegendItem>
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default FinancesLineChart;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
  },
}));

const ChartContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 216,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    width: 385,
    minWidth: 385,
    height: 253,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 540,
    minWidth: 540,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 480,
    minWidth: 480,
    height: 360,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 520,
    minWidth: 520,
  },
}));

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px 24px',
  flexWrap: 'wrap',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  margin: '0 8px',
  padding: 8,

  [theme.breakpoints.up('tablet_768')]: {
    border: 'unset',
    width: '100%',
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    padding: '16px 32px',
    margin: 'unset',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}));

const LegendItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.slate[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Dot = styled('div')<{ color: string }>(({ theme, color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: 8,

  [theme.breakpoints.up('desktop_1280')]: {
    width: 12,
    height: 12,
  },
}));
