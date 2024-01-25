import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import type { WaterFallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

export const getArraysWaterFall = (data: number[]) => {
  const inFlow = [];
  const outFlow = [];
  const auxiliaryArray = [];
  inFlow.unshift('-');
  outFlow.unshift('-');
  auxiliaryArray.push(data[0]);
  for (let i = 1, sum = 0; i < data.length; i++) {
    if (data[i] >= 0) {
      inFlow.push(data[i]);
      outFlow.push('-');
    } else {
      inFlow.push('-');
      outFlow.push(-data[i]);
    }

    sum += data[i - 1];
    // This to simulate correct the water fall
    if (data[i] < 0) {
      auxiliaryArray.push(sum + data[i]);
    } else {
      auxiliaryArray.push(sum);
    }
  }
  auxiliaryArray.push(Math.abs(auxiliaryArray[auxiliaryArray.length - 1]));

  return {
    inFlow,
    outFlow,
    auxiliaryArray,
  };
};

export const builderWaterFallSeries = (
  data: number[],
  isMobile: boolean,
  isTable: boolean,
  isLight: boolean
): WaterFallChartSeriesData[] => {
  const { inFlow, outFlow, auxiliaryArray } = getArraysWaterFall(data);

  // This this to put the start element with the same hight
  const help = auxiliaryArray.map((element, index) => {
    if (index === 0) {
      const moment = data[index];

      return moment;
    }
    return element;
  });

  // Get the colors of each bar
  const helpBarColors = help.map((_, index: number) => {
    if (index === 0 || index === help.length - 1) {
      return isLight ? '#83A7FF' : '#447AFB';
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
      color: 'rgba(0,0,0,0)',

      label: {
        formatter: (params: EChartsOption) => {
          const formatted = threeDigitsPrecisionHumanization(params.value);
          if (isMobile) {
            if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
              return `{colorful|${formatted.value}}`;
            }
            return `{hidden|${formatted.value}}`;
          } else {
            if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
              return `{colorful|${formatted.value}${formatted.suffix}}`;
            }
            return `{hidden|${formatted.value}}`;
          }
        },

        rich: {
          colorful: {
            color: '#FFF',
          },
          hidden: {
            color: 'rgba(0,0,0,0)',
          },
        },
        show: true,
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
      barMinHeight: 20,
      itemStyle: {
        borderRadius: 2,
        color: isLight ? '#CB3A0D' : '#A83815',
      },
      isVisible: true,
      label: {
        show: true,
        color: '#FFF',

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
      barMinHeight: 20,
      itemStyle: {
        borderRadius: 2,
        color: isLight ? '#2DC1B1' : '#1AAB9B',
      },
      isVisible: true,
      label: {
        show: true,
        color: '#FFF',

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

export const calculateAccumulatedArray = (data: number[]) => {
  let accumulated = 0;
  const accumulatedArray = data.map((value) => {
    accumulated += value;
    return accumulated;
  });

  return accumulatedArray;
};

export const processDataWaterFall = (data: number[], total = 0) => {
  const waterFallValues: number[] = [];
  if (!data || data.length === 0) return waterFallValues;

  // total its the amount of budget to start
  waterFallValues.push(total);

  // Difference relate the start point with the first element
  const differenceToStart = total > data[0] ? -(total - data[0]) : data[0] - total;
  waterFallValues.push(differenceToStart);

  // Add start point that its the total first element
  for (let i = 1; i < data.length; i++) {
    waterFallValues.push(data[i] - data[i - 1]);
  }

  return waterFallValues;
};
