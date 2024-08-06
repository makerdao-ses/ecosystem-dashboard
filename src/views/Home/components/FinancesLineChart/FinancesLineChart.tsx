import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
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
  console.log(financesData);

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
      // data: [260, 220, 190, 160, 120, 80, 50],
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
      // data: [480, 400, 300, 200, 140, 100, 40],
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
      // data: [null, null, null, null, null, null, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
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
      // data: [null, null, null, null, null, null, 10, 80, 160, 100, 120, 140, 100, 50, 50, 50],
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
      // data: [null, null, null, null, null, null, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
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
      // data: [null, null, null, null, null, null, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
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
      // data: [null, null, null, null, null, null, 20, 80, 160, 150, 160, 140, 100, 50, 50, 80],
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
      // data: [null, null, null, null, null, null, 30, 80, 160, 150, 160, 140, 100, 180, 50, 100],
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
