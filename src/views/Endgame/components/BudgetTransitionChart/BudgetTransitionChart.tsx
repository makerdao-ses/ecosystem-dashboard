import { styled, useMediaQuery, useTheme } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import theme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';
import type { BarChartSeries } from '@/views/Finances/utils/types';
import type { BudgetTransitionPlainData, SeriesData, TransitionStatusDataShown } from '../../types';
import type { EChartsOption } from 'echarts-for-react';

interface BudgetTransitionChartProps {
  data: BudgetTransitionPlainData;
  selected: TransitionStatusDataShown;
}

const BudgetTransitionChart: React.FC<BudgetTransitionChartProps> = ({ data, selected }) => {
  // Ajusta dinámicamente el tamaño del contenedor y la presentación de las barras según el número de barras (12 o 14).
  const hasMoreThanTwelveItems = Object.keys(data).length > 12;

  const theme = useTheme();
  const isLight = theme.palette.isLight;

  const upTable = useMediaQuery(theme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(theme.breakpoints.up('desktop_1440'));

  const barWidth = isMobile
    ? 16
    : isTablet
    ? hasMoreThanTwelveItems
      ? 18
      : 24
    : isDesktop1024
    ? hasMoreThanTwelveItems
      ? 24
      : 30
    : isDesktop1280
    ? 40
    : isDesktop1440
    ? 48
    : 48;

  const { series, legendsLabels } = useMemo(() => {
    const legacySeries = {
      name: `Legacy - ${selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-Chain`}`,
      data: [] as SeriesData[],
    };
    const endgameSeries = {
      name: `Endgame - ${selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-Chain`}`,
      data: [] as SeriesData[],
    };
    const series = [legacySeries, endgameSeries];
    const legendsLabels: string[] = [];

    const barBorderRadius = isMobile ? 4 : 6;

    const itemStyleTop = [barBorderRadius, barBorderRadius, 0, 0];
    const itemStyleNone = [0, 0, 0, 0];
    Object.entries(data).forEach(([period, values]) => {
      legacySeries.data.push({
        value: values.legacy,
        itemStyle: {
          borderRadius: values.endgame === 0 ? itemStyleTop : itemStyleNone,
        },
      });
      endgameSeries.data.push({
        value: values.endgame,
        itemStyle: {
          borderRadius: values.legacy === 0 ? itemStyleTop : itemStyleTop,
        },
      });

      legendsLabels.push(
        `${period.split('/')[1]}${isMobile || isTablet ? '' : `’${period.split('/')[0].substring(2, 4)}`}`
      );
    });

    return {
      series,
      legendsLabels,
    };
  }, [data, isMobile, isTablet, selected]);

  const years = useMemo(
    () =>
      Object.keys(data)
        .filter((period) => period.endsWith('Q1'))
        .map((period) => period.substring(0, 4)),
    [data]
  );

  const options: EChartsOption = {
    tooltip: {
      show: !isMobile,
      trigger: 'axis',
      borderRadius: 12,
      backgroundColor: isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: isLight ? '#D4D9E1' : '#231536',
          opacity: 0.15,
        },
      },
      padding: 0,
      // borderWidth: 1,
      borderColor: isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
      formatter: function (params: BarChartSeries[]) {
        const shortAmount = params.length > 10;
        const flexDirection = shortAmount ? 'row' : 'column';
        const gap = shortAmount ? '16px' : '12px';

        return `
          <div style="background-color:${
            isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
          };padding:8px 16px 8px 16px;min-width:194px;overflow:auto;border-radius:12px;">
            <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${params?.[0]?.name}</div>
            <div style="display:flex;flex-direction:${flexDirection};gap:${gap};min-width:194px;max-width:450px;flex-wrap:wrap;">
              ${params
                .reverse()
                .map(
                  (item) =>
                    `<div style="display: flex;align-items:center;gap: 6px">
                  <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                      isMobile ? 13 : 16
                    }" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                  </svg>
                  <span style="font-size:14px;color:${
                    isLight ? '#231536' : '#B6BCC2'
                  };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${
                      item.seriesName
                    }:</span>
                  <span style="font-size:16px;font-weight:700;color:${
                    isLight ? '#231536' : '#EDEFFF'
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
      height: isMobile ? 210 : isTablet ? 242 : isDesktop1024 ? 240 : isDesktop1280 ? 325 : isDesktop1440 ? 325 : 344,
      width: isMobile ? 280 : isTablet ? 345 : isDesktop1024 ? 486 : isDesktop1280 ? 685 : isDesktop1440 ? 762 : 762,
      top: isMobile ? 10 : isTablet ? 6 : isDesktop1024 ? 6 : 11,
      right: isMobile ? 6 : isTablet ? 4 : isDesktop1024 ? 6 : isDesktop1280 ? 6 : 6,
    },
    xAxis: {
      type: 'category',
      data: legendsLabels,
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
        margin: isMobile ? 6 : isTablet ? 8 : isDesktop1024 ? 10 : isDesktop1280 ? 14 : 16,
        color: isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
        align: 'center',
        fontFamily: 'OpenSansCondensed,san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : upTable ? (hasMoreThanTwelveItems ? 12 : 14) : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        offset: 10,
        formatter: function (value: string) {
          if (isMobile) {
            if (value.startsWith('Q1')) {
              return `{bgImg|${value}}      `;
            } else {
              return `${value.charAt(1)}`;
            }
          }
          return value;
        },
        rich: {
          bgImg: {
            verticalAlign: 'top',

            align: 'left',
            color: isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
            fontFamily: 'OpenSansCondensed,san-serif',
            fontWeight: 700,
            fontSize: isMobile ? 12 : upTable ? (hasMoreThanTwelveItems ? 12 : 14) : 9,
            interval: 0,
            margin: 150,
            padding: [0, 0, 20, 16],
            backgroundColor: {
              image: isLight ? '/assets/img/line.png' : '/assets/img/line_dark.png',
            },
          },
        },
      },
    },

    yAxis: {
      axisLabel: {
        margin: isMobile ? 10 : isTablet ? 8 : isDesktop1024 ? 10 : isDesktop1280 ? 24 : isDesktop1440 ? 24 : 32,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
        fontSize: isMobile ? 12 : isTablet ? 14 : 14,
        height: upTable ? 15 : 12,
        fontFamily: 'OpenSansCondensed, sans-serif',
        fontWeight: 700,
        lineHeight: 22,
      },
      verticalAlign: 'middle',
      height: upTable ? 15 : 12,

      type: 'value',
      zlevel: 1,
      splitNumber: 10,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: isLight ? '#D4D9E1' : theme.palette.colors.slate[400],
          width: 0.5,
        },
      },
    },
    series: [
      {
        ...series[0],
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth,
        zlevel: 1,
        itemStyle: {
          color: isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[600],
        },
        emphasis: {
          itemStyle: {
            color: isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[500],
          },
        },
      },
      {
        ...series[1],
        type: 'bar',
        stack: 'x',
        zlevel: 1,
        showBackground: false,
        barWidth,
        itemStyle: {
          color: isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
        },
        emphasis: {
          itemStyle: {
            color: isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[800],
          },
        },
      },
    ],
  };

  return (
    <Wrapper>
      <ChartContainer hasMoreThanTwelveItems={hasMoreThanTwelveItems}>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        <YearsContainer barsAmount={Object.keys(data).length}>
          {years.map((year) => (
            <Year key={year}>{year}</Year>
          ))}
        </YearsContainer>
      </ChartContainer>
      <LegendContainer>
        <LegendItem variant="blue">
          <Circle variant="blue" />
          Endgame-{selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}
        </LegendItem>
        <LegendItemStyled variant="gray">
          <Circle variant="gray" />
          Legacy-{selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}
        </LegendItemStyled>
      </LegendContainer>
    </Wrapper>
  );
};

export default BudgetTransitionChart;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const ChartContainer = styled('div')<{ hasMoreThanTwelveItems: boolean }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 327,
  height: 271,
  margin: '-12px auto 0',
  [theme.breakpoints.up('tablet_768')]: {
    margin: '12px 0 0',
    maxWidth: 390,
    height: 306,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 532,
    height: 280,
    margin: '12px 0 0',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 764,
    height: 367,
    margin: '8px 0 0',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 832,
    height: 367,
  },
}));

const YearsContainer = styled('div')<{ barsAmount: number }>(({ barsAmount }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  gap: (314 / barsAmount) * 4 - 30,
  bottom: 6,
  left: 45,
  'div:nth-of-type(n+2)': {
    marginLeft: -3,
  },
  'div:nth-of-type(n+3)': {
    marginLeft: -2,
  },
  [theme.breakpoints.up('tablet_768')]: {
    bottom: 6,
    left: 50,
    gap: (358 / barsAmount) * 4 - 30,
    'div:nth-of-type(n+2)': {
      marginLeft: 'revert',
    },
    'div:nth-of-type(n+3)': {
      marginLeft: 'revert',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const Year = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[500],
  fontSize: 12,
  fontFamily: 'OpenSansCondensed, sans-serif',
  lineHeight: '22px',
  fontWeight: 700,
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
  },
}));

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  margin: '-6px auto 0',
  borderRadius: 12,
  [theme.breakpoints.up('tablet_768')]: {
    margin: '6px 0 0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    gap: 24,
    minWidth: 263,
    height: 306,
    flex: 0.9,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    margin: '6px 0 0',
    minWidth: 362,
    marginRight: -4,
    height: 280,
    flex: 'revert',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 356,
    margin: '8px 0 0',
    marginRight: 0,
    height: 367,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 385,
  },
}));

const LegendItem = styled('div')<{ variant: 'blue' | 'gray' }>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 12,
  gap: 8,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  fontWeight: 600,
  marginLeft: -4,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const LegendItemStyled = styled(LegendItem)({
  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: -16,
  },
});

const Circle = styled('div')<{ variant: 'blue' | 'gray' }>(({ variant }) => ({
  width: 8,
  height: 8,
  borderRadius: 12,
  top: 3,
  display: 'flex',
  backgroundColor: theme.palette.isLight
    ? variant === 'blue'
      ? theme.palette.colors.blue[700]
      : theme.palette.colors.charcoal[200]
    : variant === 'gray'
    ? theme.palette.colors.charcoal[600]
    : theme.palette.colors.blue[900],

  [theme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
