import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useMemo } from 'react';
import type { BudgetTransitionPlainData, SeriesData, TransitionStatusDataShown } from '../../types';
import type { BarChartSeries } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';

interface BudgetTransitionChartProps {
  data: BudgetTransitionPlainData;
  selected: TransitionStatusDataShown;
}

const BudgetTransitionChart: React.FC<BudgetTransitionChartProps> = ({ data, selected }) => {
  const { isLight } = useThemeContext();
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));

  const barWidth = isMobile ? 16 : isTablet ? 32 : isDesktop1024 ? 40 : 56;

  const { series, legendsLabels } = useMemo(() => {
    const legacySeries = {
      name: `Legacy - ${selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}`,
      data: [] as SeriesData[],
    };
    const endgameSeries = {
      name: `Endgame - ${selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}`,
      data: [] as SeriesData[],
    };
    const series = [legacySeries, endgameSeries];
    const legendsLabels: string[] = [];

    const barBorderRadius = isMobile ? 4 : 6;
    const itemStyleBottom = [0, 0, barBorderRadius, barBorderRadius];
    const itemStyleTop = [barBorderRadius, barBorderRadius, 0, 0];
    const itemStyleFull = [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius];
    Object.entries(data).forEach(([period, values]) => {
      legacySeries.data.push({
        value: values.legacy,
        itemStyle: {
          borderRadius: values.endgame === 0 ? itemStyleFull : itemStyleBottom,
        },
      });
      endgameSeries.data.push({
        value: values.endgame,
        itemStyle: {
          borderRadius: values.legacy === 0 ? itemStyleFull : itemStyleTop,
        },
      });

      legendsLabels.push(`${period.split('/')[1]}${isMobile ? '' : `’${period.split('/')[0].substring(2, 4)}`}`);
    });

    return {
      series,
      legendsLabels,
    };
  }, [data, isMobile, selected]);

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

      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: isLight ? '#D4D9E1' : '#231536',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderWidth: 1,
      borderColor: isLight ? '#D4D9E1' : '#231536',
      formatter: function (params: BarChartSeries[]) {
        const shortAmount = params.length > 10;
        const flexDirection = shortAmount ? 'row' : 'column';
        const gap = shortAmount ? '16px' : '12px';

        return `
          <div style="background-color:${
            isLight ? '#fff' : '#000A13'
          };padding:16px;min-width:194px;overflow:auto;border-radius:3px;">
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
      height: isMobile ? 222 : isTablet ? 312 : isDesktop1024 ? 392 : 392,
      width: isMobile ? 273 : isTablet ? 588 : isDesktop1024 ? 765 : 960,
      top: isMobile ? 15 : isTablet ? 6 : isDesktop1024 ? 6 : 11,
      right: isMobile ? 6 : isTablet ? 7 : isDesktop1024 ? 10 : 4,
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
            color: isLight ? '#139D8D' : '#2DC1B1',
            padding: [1, 4, 7, 4],
            fontFamily: 'Inter, sans-serif',
            fontSize: upTable ? 12 : 9,
            lineHeight: upTable ? 15 : 11,
            interval: 0,
            backgroundColor: {
              image: isLight ? '/assets/img/endgame/year_indicator.svg' : '/assets/img/endgame/year_indicator-dark.svg',
            },
          },
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 13 : isTablet ? 22 : isDesktop1024 ? 32 : 28,
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
        ...series[0],
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth,
        itemStyle: {
          color: isLight ? '#FBCC5F' : '#F9A606',
        },
      },
      {
        ...series[1],
        type: 'bar',
        stack: 'x',
        showBackground: false,
        barWidth,
        itemStyle: {
          color: isLight ? '#2DC1B1' : '#098C7D',
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
        <YearsContainer barsAmount={Object.keys(data).length}>
          {years.map((year) => (
            <Year isLight={isLight} key={year}>
              {year}
            </Year>
          ))}
        </YearsContainer>
      </ChartContainer>
      <LegendContainer>
        <LegendItem isLight={isLight} variant="yellow">
          Legacy - {selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}
        </LegendItem>
        <LegendItem isLight={isLight} variant="green">
          Endgame - {selected === 'Budget' ? 'Budget Cap' : `Net ${!isMobile ? 'Expenses' : ''} On-chain`}
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

  [lightTheme.breakpoints.up('tablet_768')]: {
    maxWidth: 656,
    height: 350,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 848,
    height: 431,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 436,
  },
});

const YearsContainer = styled.div<{ barsAmount: number }>(({ barsAmount }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  gap: (281 / barsAmount) * 4 - 30,
  bottom: -20,
  left: 45,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Year = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#139D8D' : '#2DC1B1',
  fontSize: 11,
  lineHeight: 'normal',
}));

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  width: 'fit-content',
  margin: '47px auto 0',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 64,
    marginTop: 39,
  },
});

const LegendItem = styled.div<WithIsLight & { variant: 'yellow' | 'green' }>(({ isLight, variant }) => ({
  position: 'relative',
  fontSize: 11,
  lineHeight: 'normal',
  color: isLight ? '#708390' : '#D2D4EF',
  marginLeft: 13,

  '&::before': {
    content: '""',
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 12,
    top: 3,
    left: -12,
    backgroundColor: isLight
      ? variant === 'yellow'
        ? '#FBCC5F'
        : '#2DC1B1'
      : variant === 'yellow'
      ? '#F9A606'
      : '#098C7D',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
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
