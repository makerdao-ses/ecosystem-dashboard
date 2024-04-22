import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import {
  formatBudgetName,
  formatterBreakdownChart,
  getChartAxisLabelByGranularity,
  removeBudgetWord,
} from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { formatNumber, replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useRef } from 'react';
import type { CumulativeType } from '../useMakerDAOExpenseMetrics';
import type { BarChartSeries, LineChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';
interface BreakdownChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: LineChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  isCumulative: boolean;
  cumulativeType: CumulativeType;
}

const MakerDAOChartMetrics: React.FC<BreakdownChartProps> = ({
  year,
  selectedGranularity,
  series,
  handleToggleSeries,
  isCumulative,
  cumulativeType,
}) => {
  const { isLight } = useThemeContext();
  const chartRef = useRef<EChartsOption | null>(null);
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'tablet_768'));
  const isLessMobile = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const showLineYear = (isMobile || isLessMobile) && selectedGranularity === 'monthly';
  const isMobileOrLess = isMobile || isLessMobile;

  const xAxisStyles = {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    color: '#708390',
    fontWeight: 600,
    fontSize: upTable ? 12 : isLessMobile ? 8 : 9,
    verticalAlign: 'top',
    interval: 0,
  };

  const options: EChartsOption = {
    tooltip: {
      show: !isMobile,
      trigger: 'axis',
      extraCssText: `z-index:${zIndexEnum.ECHART_TOOL_TIP}`,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: isLight ? '#D4D9E1' : '#231536',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderWidth: 1,
      position: function (
        point: [number, number],
        params: EChartsOption,
        dom: EChartsOption,
        rect: EChartsOption,
        size: EChartsOption
      ) {
        const MORE_WITH = 10;
        const withTooltip = size.contentSize[0];
        const heightTooltip = size.contentSize[0];

        let xPos = point[0];
        let yPos = point[1];

        const tooltipWidth = withTooltip;
        const tooltipHeight = heightTooltip;

        if (xPos + tooltipWidth + MORE_WITH > window.innerWidth) {
          xPos -= tooltipWidth;
        }

        if (yPos + tooltipHeight + MORE_WITH > window.innerHeight) {
          yPos -= tooltipHeight;
        }
      },
      borderColor: isLight ? '#D4D9E1' : '#231536',
      formatter: function (params: BarChartSeries[]) {
        // If all values are cero, don't show tooltip
        if (params.every((item) => item.value === 0)) {
          return '';
        }

        const shortAmount = params.length > 10;
        const flexDirection = shortAmount ? 'row' : 'column';
        const wrap = shortAmount ? 'flex-wrap:wrap;' : '';
        const gap = shortAmount ? '16px' : '12px';
        const minMax = isTablet
          ? 'max-width:300px'
          : isDesktop1024
          ? 'max-width:400px'
          : 'min-width:190px;max-width:450px';
        const maxWithTable = isTablet ? 'max-width:190px' : isDesktop1024 ? 'max-width:450px' : '';

        return `
          <div style="background-color:${isLight ? '#fff' : '#000A13'};padding:16px;overflow:auto;border-radius:3px;">
            <div style="display: flex;justify-content: space-between;gap:24px;text-align:center;">
              <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${
                (selectedGranularity as string) === 'Annually' ? year : params?.[0]?.name
              }</div>
              ${
                isCumulative
                  ? `<div style="text-transform:uppercase;font-weight:300;font-size:11px;color:${
                      isLight ? '#434358' : '#546978'
                    }">${cumulativeType} cumulative</div>`
                  : ''
              }
            </div>
            <div style="display:flex;flex-direction:${flexDirection};gap:${gap};${wrap}${minMax}">
              ${params
                .reverse()
                .map(
                  (item) =>
                    `<div style="display: flex;align-items:center;gap: 6px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                      isMobile ? 13 : 16
                    }" viewBox="0 0 13 13" fill="none" style="min-width:${isMobile ? 13 : 16};min-height:${
                      isMobile ? 13 : 16
                    }">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                    <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                  </svg>
                  <span style="display: inline-block;font-size:14px;color:${
                    isLight ? '#231536' : '#B6BCC2'
                  };white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${maxWithTable}"> ${
                      !isMobile
                        ? formatBudgetName(item.seriesName)
                        : removeBudgetWord(formatBudgetName(item.seriesName))
                    }:</span>
                  <span style="font-size:16px;font-weight:700;color:${
                    isLight ? '#231536' : '#EDEFFF'
                  };display: inline-block;">${formatNumber(item.value)}</span>
                </div>`
                )
                .join('')}
            </div>
          </div>
          `;
      },
    },
    grid: {
      height: isLessMobile ? 192 : isMobile ? 192 : isTablet ? 409 : isDesktop1024 ? 398 : isDesktop1280 ? 399 : 399,
      width: isLessMobile ? 290 : isMobile ? 304 : isTablet ? 645 : isDesktop1024 ? 704 : isDesktop1280 ? 955 : 955,
      top: isLessMobile ? 10 : isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      right: isLessMobile ? 2 : isMobile ? 2 : isTablet ? 0 : isDesktop1024 ? 36 : isDesktop1280 ? 4 : 4,
    },
    xAxis: {
      type: 'category',
      data: getChartAxisLabelByGranularity(selectedGranularity, isMobileOrLess),
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
        margin: isMobile ? 12 : isTablet ? 12 : isDesktop1024 ? 26 : isDesktop1280 ? 20 : 20,
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        formatter: function (value: string) {
          const formatted = formatterBreakdownChart(
            selectedGranularity as AnalyticGranularity,
            isMobile,
            year,
            value,
            isMobileOrLess
          );
          return formatted;
        },
        rich: {
          month: xAxisStyles,
          year: xAxisStyles,
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isLessMobile ? 4 : isMobile ? 10 : isTablet ? 12 : isDesktop1024 ? 26 : isDesktop1280 ? 20 : 20,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value, true);
        },
        color: isLight ? '#231536' : '#EDEFFF',
        fontSize: isLessMobile ? 10 : isMobile ? 10 : isTablet ? 14 : 14,
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
    series,
  };

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    });
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={chartRef}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && (
          <YearXAxis isLight={isLight} isLessMobile={isLessMobile}>
            <YearText isLight={isLight}>{year}</YearText>
          </YearXAxis>
        )}
        <LegendContainer>
          {series.map((seriesItem: LineChartSeriesData) => (
            <LegendItem
              isLight={isLight}
              onMouseEnter={() => onLegendItemHover(seriesItem.name)}
              onMouseLeave={() => onLegendItemLeave(seriesItem.name)}
              onClick={() => handleToggleSeries(seriesItem.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 13 : 16}
                height={isMobile ? 13 : 16}
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke={seriesItem.itemStyle.color} />
                <circle cx="6.5" cy="6.5" r="4" fill={seriesItem.itemStyle.color} />
              </svg>
              {seriesItem.name === 'Net Expenses Off-chain'
                ? `${isMobile ? 'Net Expenses Off-chain' : 'Net Expenses Off-chain included'}`
                : seriesItem.name}
            </LegendItem>
          ))}
        </LegendContainer>
      </ChartContainer>
    </Wrapper>
  );
};

export default MakerDAOChartMetrics;

const Wrapper = styled.div({
  marginTop: 32,
});

const ChartContainer = styled.div({
  [lightTheme.breakpoints.down('mobile_375')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    minWidth: 328,
    height: 319,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -4,
  },
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    maxWidth: 343,
    height: 319,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -4,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    position: 'relative',
    maxWidth: 756,
    height: 560,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 848,
    height: 521,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 521,
  },
});

const YearXAxis = styled.div<WithIsLight & { isLessMobile: boolean }>(({ isLight, isLessMobile }) => {
  const border = `1px solid ${isLight ? '#6EDBD0' : '#1AAB9B'}`;

  return {
    position: 'absolute',
    bottom: isLessMobile ? 70 : 80,
    left: isLessMobile ? 30 : 40,
    right: 5,
    height: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: 'normal',
  color: isLight ? '#139D8D' : '#1AAB9B',
  position: 'absolute',
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  textAlign: 'center',
}));

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flex: 1,
  gap: 24,
  position: 'absolute',
  bottom: 0,
  rowGap: 14,

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 42,
    rowGap: 16,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: -6,
    gap: 40,
    minWidth: 940,
    justifyContent: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 65,
    marginLeft: -46,
    width: '100%',
    minWidth: 'revert',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 65,
    marginLeft: 2,
  },

  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginLeft: -45,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  lineHeight: 'normal',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
  },
}));
