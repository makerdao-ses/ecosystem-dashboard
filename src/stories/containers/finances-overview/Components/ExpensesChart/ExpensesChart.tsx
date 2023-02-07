/* eslint-disable @typescript-eslint/no-unused-vars */
import { useThemeContext } from '@ses/core/context/ThemeContext';
import ReactECharts from 'echarts-for-react';
import { DateTime } from 'luxon';
import React from 'react';
import useFinancesOverview from '../../useFinancesOverview';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chart.dto';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';

interface Props {
  monthly: Partial<ExpenseDto>[];
  newActual: ValuesDataWithBorder[];
  newDiscontinued: ValuesDataWithBorder[];
  newPrediction: ValuesDataWithBorder[];
}

const ExpensesChart: React.FC<Props> = ({ monthly, newActual, newDiscontinued, newPrediction }: Props) => {
  const { isLight } = useThemeContext();
  // eslint-disable-next-line spellcheck/spell-checker
  const isZeroValue = false;
  console.log('monthly', monthly);
  const options = {
    legend: {
      align: 'left',
      itemGap: 25,
      itemHeight: 8,
      itemWidth: 8,
      itemStyle: {
        borderCap: 'round',
        borderJoin: 'round',
      },
      icon: 'circle',
      data: [
        {
          name: 'Active Budget',
          icon: 'circle',
          textStyle: {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 11,
            lineHeight: 13,
            color: isLight ? '#231536' : '#EDEFFF',
          },
        },
        {
          name: 'Discontinued',
          icon: 'circle',
          textStyle: {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 11,
            lineHeight: 13,
            color: isLight ? '#231536' : '#EDEFFF',
          },
        },
        {
          name: 'Expense forecasts',
          icon: 'circle',
          textStyle: {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 11,
            lineHeight: 13,
            color: isLight ? '#231536' : '#EDEFFF',
          },
        },
      ],
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'],
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
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: 9,
        lineHeight: 11,
        baseline: 'top',
      },
    },
    yAxis: {
      axisLabel: {
        // eslint-disable-next-line spellcheck/spell-checker
        formatter: function (value: number) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
          } else {
            return value.toString();
          }
        },
        color: isLight ? '#231536' : '#EDEFFF',
      },

      type: 'value',
      // eslint-disable-next-line spellcheck/spell-checker
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: isLight ? '#9FAFB9' : '#D8E0E3',
          width: isZeroValue ? 0 : 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: newActual,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },

        itemStyle: {
          color: isLight ? '#0EB19F' : '#027265',
        },
      },
      {
        name: 'Discontinued',
        data: newDiscontinued,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        itemStyle: {
          color: isLight ? '#027265' : '#2C3F3B',
        },
      },
      {
        name: 'Expense forecasts',
        data: newPrediction,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        itemStyle: {
          color: isLight ? '#68FEE3' : '#1AAB9B',
        },
      },
    ],
  };

  return (
    <div
      style={{
        height: 400,
        width: '100vw',
      }}
    >
      <ReactECharts
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
};

export default ExpensesChart;
