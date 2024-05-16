import { styled, useMediaQuery, useTheme } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import theme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';
import type { BudgetTransitionPlainData, SeriesData, TransitionStatusDataShown } from '../../types';
import type { BarChartSeries } from '@ses/containers/Finances/utils/types';
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
    : 56;

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
      height: isMobile ? 200 : isTablet ? 262 : isDesktop1024 ? 240 : isDesktop1280 ? 325 : isDesktop1440 ? 325 : 344,
      width: isMobile ? 280 : isTablet ? 345 : isDesktop1024 ? 486 : isDesktop1280 ? 667 : isDesktop1440 ? 752 : 752,
      top: isMobile ? 15 : isTablet ? 6 : isDesktop1024 ? 6 : 11,
      right: isMobile ? 6 : isTablet ? 4 : isDesktop1024 ? 6 : 14,
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
        margin: isMobile || isTablet ? 16 : 8,
        color: isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
        align: 'center',
        fontFamily: 'OpenSansCondensed,san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : upTable ? (hasMoreThanTwelveItems ? 12 : 14) : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        formatter: function (value: string) {
          if (isMobile && value.startsWith('Q1')) {
            return value;
          }
          return value;
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 10 : isTablet ? 8 : isDesktop1024 ? 10 : isDesktop1280 ? 10 : isDesktop1440 ? 32 : 32,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
        fontSize: isMobile ? 10 : isTablet ? 14 : 14,
        height: upTable ? 15 : 12,
        fontFamily: 'OpenSansCondensed, sans-serif',
        fontWeight: 700,
        lineHeight: 22,
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
  },
}));

const ChartContainer = styled('div')<{ hasMoreThanTwelveItems: boolean }>(({ theme, hasMoreThanTwelveItems }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 327,
  height: 271,
  margin: '0px auto 0',
  [theme.breakpoints.up('tablet_768')]: {
    margin: '16px auto 0',
    maxWidth: 390,
    height: 306,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: hasMoreThanTwelveItems ? 590 : 532,
    height: 280,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 764,
    height: 367,
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
  gap: (281 / barsAmount) * 4 - 30,
  bottom: 4,
  left: 45,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Year = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : '#2DC1B1',
  fontSize: 12,
  fontFamily: 'OpenSansCondensed, sans-serif',
  lineHeight: '22px',
  fontWeight: 700,
}));

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 7,
  margin: '16px auto 0',
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    justifyContent: 'center',
    gap: 24,
    minWidth: 263,
    padding: '0px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    margin: '10px 0 0',
    minWidth: 362,
    marginRight: -4,
    height: 280,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 384,
    height: 367,
  },
}));

const LegendItem = styled('div')<{ variant: 'blue' | 'gray' }>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 11,
  gap: 8,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],

  fontWeight: 600,

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
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: -16,
  },
});

const Circle = styled('div')<{ variant: 'blue' | 'gray' }>(({ variant }) => ({
  width: 8,
  height: 8,
  borderRadius: 12,
  top: 3,
  backgroundColor: theme.palette.isLight
    ? variant === 'blue'
      ? theme.palette.colors.blue[700]
      : theme.palette.colors.charcoal[200]
    : variant === 'gray'
    ? theme.palette.colors.charcoal[600]
    : theme.palette.colors.blue[900],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
    width: 12,
    height: 12,
  },
}));
