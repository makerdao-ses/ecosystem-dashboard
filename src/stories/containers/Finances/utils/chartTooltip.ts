import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { formatNumber } from '@ses/core/utils/string';
import { getSelectMetricText } from '../components/BreakdownChartSection/utils';
import { formatBudgetName, removeBudgetWord } from './utils';
import type { BarChartSeries } from './types';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

export const createChartTooltip = (
  selectedGranularity: string,
  year: number | string,
  isLight: boolean,
  isMobile: boolean,
  isTable: boolean,
  isDesktop1024: boolean,
  isBudgetRemove?: boolean,
  metric?: AnalyticMetric,
  isShowMetric?: boolean
) => ({
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
    const shortAmount = params.length > 10;
    const flexDirection = shortAmount ? 'row' : 'column';
    const wrap = shortAmount ? 'flex-wrap:wrap;' : '';
    const gap = shortAmount ? '16px' : '12px';
    const minMax = isTable ? 'max-width:300px' : isDesktop1024 ? 'max-width:400px' : 'min-width:190px;max-width:450px';
    const maxWithTable = isTable ? 'max-width:190px' : isDesktop1024 ? 'max-width:450px' : '';
    return `
      <div style="background-color:${isLight ? '#fff' : '#000A13'};padding:16px;overflow:auto;border-radius:3px;">
        <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${
          (selectedGranularity as string) === 'Annually' ? year : params?.[0]?.name
        }<span style="display:inline-block;margin-left:10px">${
      isShowMetric ? getSelectMetricText(metric) : ''
    }</span></div>
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
                  !isBudgetRemove
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
});
