import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import type { WaterFallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

export const getArraysWaterFall = (data: number[]) => {
  const inFlow = [];
  const outFlow = [];
  const auxiliaryArray = [];
  inFlow.unshift('-');
  outFlow.unshift('-');
  for (let i = 1, sum = 0; i < data.length; i++) {
    if (data[i] >= 0) {
      inFlow.push(data[i]);
      outFlow.push('-');
    } else {
      inFlow.push('-');
      outFlow.push(-data[i]);
    }
    sum += data[i - 1];

    auxiliaryArray.push(sum);
  }

  return {
    inFlow,
    outFlow,
    auxiliaryArray,
  };
};

export const builderWaterFallSeries = (
  data: number[],
  isMobile: boolean,
  isTable: boolean
): WaterFallChartSeriesData[] => {
  const { inFlow, outFlow, auxiliaryArray } = getArraysWaterFall(data);

  // Add the same value at the end to simulate the end
  auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1]);
  auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1]);

  // This this to put the start element with the same hight
  const help = auxiliaryArray.map((element, index) => {
    if (index === 0) {
      const moment = data[index] + data[index + 1];

      return moment;
    }
    return element;
  });

  // Get the colors of each bar
  const helpBarColors = help.map((value, index) => {
    if (index === 0 || index === help.length - 1) {
      return '#83A7FF';
    } else {
      return 'rgba(0,0,0,0)';
    }
  });
  const series = [
    {
      name: 'Reserves Balance',
      barWidth: isMobile ? 19 : isTable ? 39 : 48,
      data: help,
      itemStyle: {
        borderRadius: 2,
        color: (params: EChartsOption) => helpBarColors[params.dataIndex],
      },
      isVisible: true,
      label: {
        show: true,
        color: 'transparent',
        position: 'insideTop',
        fontSize: isMobile ? 8 : 12,
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'Outflow',
      barWidth: isMobile ? 19 : 39,
      data: outFlow,
      itemStyle: {
        borderRadius: 2,
        color: '#CB3A0D',
      },
      isVisible: true,
      label: {
        show: true,
        fontSize: isMobile ? 8 : 12,
        position: 'insideTop',
        formatter: (params: EChartsOption) => {
          const formatted = threeDigitsPrecisionHumanization(params.value);
          if (isMobile) {
            return formatted.value;
          }
          return `${formatted.value}${formatted.suffix}`;
        },
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'IntFlow',
      barWidth: isMobile ? 19 : 39,
      data: inFlow,
      itemStyle: {
        borderRadius: 2,
        color: '#2DC1B1',
      },
      isVisible: true,
      label: {
        show: true,
        fontSize: isMobile ? 8 : 12,
        position: 'insideTop',
        formatter: (params: EChartsOption) => {
          const formatted = threeDigitsPrecisionHumanization(params.value);
          if (isMobile) {
            return formatted.value;
          }
          return `${formatted.value}${formatted.suffix}`;
        },
      },
      stack: 'all',
      type: 'bar',
    },
  ];
  return series;
};
