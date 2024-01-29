import { formatNumber } from '@ses/core/utils/string';
import { nameChanged } from './utils';
import type { BarChartSeries } from './types';

export const createChartTooltip = (
  selectedGranularity: string,
  year: number | string,
  isLight: boolean,
  isMobile: boolean,
  isWaterFall?: boolean
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
    const maxWidth = shortAmount ? 250 : 450;
    const newParams = [...params].filter((item) => !item.seriesName.includes('Line'));

    return `
      <div style="background-color:${
        isLight ? '#fff' : '#000A13'
      };padding:16px;min-width:194px;overflow:auto;border-radius:3px;">
        <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:#B6BCC2;">${
          (selectedGranularity as string) === 'Annually' ? year : newParams?.[0]?.name
        }</div>
        <div style="display:flex;flex-direction:${flexDirection};gap:${gap};min-width:194px;max-width:${maxWidth}px;flex-wrap:wrap;">
          ${newParams
            .reverse()
            .map((item) => {
              const color = isLight ? '#83A7FF' : '#447AFB';
              const value = !isWaterFall ? item.color : item.seriesName === 'Reserves Balance' ? color : item.color;
              return `<div style="display: flex;align-items:center;gap: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                isMobile ? 13 : 16
              }" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="${value}" />
                <circle cx="6.5" cy="6.5" r="4" fill="${value}" />
              </svg>
              <span style="font-size:14px;color:${isLight ? '#231536' : '#B6BCC2'};"> ${nameChanged(
                item.seriesName
              )}:</span>
              <span style="font-size:16px;font-weight:700;color:${isLight ? '#231536' : '#EDEFFF'};">${formatNumber(
                item.value
              )}</span>
            </div>`;
            })
            .join('')}
        </div>
      </div>
      `;
  },
});
