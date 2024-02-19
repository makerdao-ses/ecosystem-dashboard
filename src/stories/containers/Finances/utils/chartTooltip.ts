import { formatNumber } from '@ses/core/utils/string';
import { formatBudgetName } from './utils';
import type { BarChartSeries } from './types';

export const createChartTooltip = (
  selectedGranularity: string,
  year: number | string,
  isLight: boolean,
  isMobile: boolean
) => ({
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
        <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${
          (selectedGranularity as string) === 'Annually' ? year : params?.[0]?.name
        }</div>
        <div style="display:flex;flex-direction:${flexDirection};gap:${gap};min-width:194px;max-width:450px;flex-wrap:wrap;">
          ${params
            .reverse()
            .map(
              (item) =>
                `<div style="display: flex;align-items:center;gap: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                  isMobile ? 13 : 16
                }" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
              </svg>
              <span style="font-size:14px;color:${isLight ? '#231536' : '#B6BCC2'};"> ${formatBudgetName(
                  item.seriesName
                )}:</span>
              <span style="font-size:16px;font-weight:700;color:${isLight ? '#231536' : '#EDEFFF'};">${formatNumber(
                  item.value
                )}</span>
            </div>`
            )
            .join('')}
        </div>
      </div>
      `;
  },
});
