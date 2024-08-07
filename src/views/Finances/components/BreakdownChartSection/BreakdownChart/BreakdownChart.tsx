import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo } from 'react';
import { usLocalizedNumber } from '@/core/utils/humanization';
import type { BarChartSeries, BreakdownChartSeriesData } from '@/views/Finances/utils/types';
import {
  formatterBreakdownChart,
  getChartAxisLabelByGranularity,
  formatBudgetName,
  removeBudgetWord,
} from '@/views/Finances/utils/utils';
import { getSelectMetricText } from '../utils';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';

interface BreakdownChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
  selectedMetric?: AnalyticMetric;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({
  year,
  refBreakDownChart,
  series,
  handleToggleSeries,
  selectedGranularity,
  selectedMetric,
}) => {
  const { isLight } = useThemeContext();
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isLessMobile = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));

  const isMobileOrLess = isMobile || isLessMobile;
  const showLineYear = (isMobile || isLessMobile) && selectedGranularity === 'monthly';

  const xAxisStyles = useMemo(
    () => ({
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      color: '#708390',
      fontWeight: 600,
      fontSize: upTable ? 12 : isLessMobile ? 8 : 9,
      verticalAlign: 'top',
      interval: 0,
    }),
    [isLessMobile, upTable]
  );

  const options: EChartsOption = useMemo(
    () => ({
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
          const filteredParams = params.filter((item) => item.value !== 0 && Math.abs(item.value) > 0.004);
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
              <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${
                (selectedGranularity as string) === 'Annually' ? year : params?.[0]?.name?.replace('’', "'")
              }<span style="display:inline-block;margin-left:4px">${getSelectMetricText(selectedMetric)}</span></div>
              <div style="display:flex;flex-direction:${flexDirection};gap:${gap};${wrap}${minMax}">
                ${filteredParams
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
                    };white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${maxWithTable}"> ${removeBudgetWord(
                        formatBudgetName(item.seriesName)
                      )}:</span>
                    <span style="font-size:16px;font-weight:700;color:${
                      isLight ? '#231536' : '#EDEFFF'
                    };display: inline-block;">${usLocalizedNumber(item.value, 2)}</span>
                  </div>`
                  )
                  .join('')}
              </div>
            </div>
            `;
        },
      },
      grid: {
        height: isLessMobile ? 198 : isMobile ? 192 : isTablet ? 390 : isDesktop1024 ? 392 : isDesktop1280 ? 392 : 392,
        width: isLessMobile ? 300 : isMobile ? 304 : isTablet ? 630 : isDesktop1024 ? 678 : isDesktop1280 ? 955 : 955,
        top: isLessMobile ? 10 : isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
        right: isMobile ? 2 : isTablet ? 7 : isDesktop1024 ? 50 : isDesktop1280 ? 4 : 4,
      },
      xAxis: {
        show: true,
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
          margin: isMobile ? 12 : isTablet ? 18 : isDesktop1024 ? 20 : isDesktop1280 ? 16 : 16,
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
              isLessMobile
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
        min: series.length === 0 ? 0 : null,
        max: series.length === 0 ? 1 : null,
        show: true,
        axisLabel: {
          show: true,
          margin: isLessMobile ? 4 : isMobile ? 10 : isTablet ? 22 : isDesktop1024 ? 32 : isDesktop1280 ? 20 : 20,
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
        splitNumber: 12,
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            width: 0.25,
            color: isLight ? '#31424E' : '#D8E0E3',
          },
        },
      },
      series,
    }),
    [
      isDesktop1024,
      isDesktop1280,
      isLessMobile,
      isLight,
      isMobile,
      isMobileOrLess,
      isTablet,
      selectedGranularity,
      selectedMetric,
      series,
      upTable,
      xAxisStyles,
      year,
    ]
  );

  useEffect(() => {
    // avoid to merge data when moving between levels
    const chartInstance = refBreakDownChart?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options, refBreakDownChart]);

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = refBreakDownChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = refBreakDownChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    });
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={refBreakDownChart}
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
      </ChartContainer>
      <LegendContainer>
        {series.map((element, index) => (
          <LegendItem
            key={index}
            isLight={isLight}
            onMouseEnter={() => onLegendItemHover(element.name)}
            onMouseLeave={() => onLegendItemLeave(element.name)}
            onClick={() => handleToggleSeries(element.name)}
          >
            <SVGContainer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 13 : 16}
                height={isMobile ? 13 : 16}
                viewBox="0 0 13 13"
                fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.colorOriginal} />
                <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.colorOriginal} />
              </svg>
            </SVGContainer>
            {removeBudgetWord(formatBudgetName(element.name))}
          </LegendItem>
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default BreakdownChart;

const Wrapper = styled.div({});

const ChartContainer = styled.div({
  [lightTheme.breakpoints.down('mobile_375')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    minWidth: 328,
    height: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24,
  },
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    minWidth: 'revert',
    maxWidth: 343,
    height: 260,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    maxWidth: 756,
    height: 510,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 848,
    height: 508,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 508,
  },
});

const YearXAxis = styled.div<WithIsLight & { isLessMobile: boolean }>(({ isLight, isLessMobile }) => {
  const border = `1px solid ${isLight ? '#6EDBD0' : '#1AAB9B'}`;

  return {
    position: 'absolute',
    bottom: isLessMobile ? 12 : 22,
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
  color: isLight ? '#139D8D' : '#2DC1B1',
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
  paddingLeft: 8,
  paddingRight: 6,
  gap: 22,
  rowGap: 12,
  marginTop: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: -22,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 60,
    rowGap: 16,
  },
});

const LegendItem = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
  cursor: 'pointer',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
    maxWidth: 'revert',
    minWidth: 'revert',
  },
}));

const SVGContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});
