import { useThemeContext } from '@ses/core/context/ThemeContext';
import ReactECharts from 'echarts-for-react';
import { DateTime } from 'luxon';
import React from 'react';
import useFinancesOverview from '../../useFinancesOverview';

const ExpensesChart: React.FC = () => {
  const { isLight } = useThemeContext();
  const { processDataPerMonth } = useFinancesOverview();
  const mockData = [
    {
      period: '2023-01',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 13512500.0,
    },
    {
      period: '2023-02',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-03',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-04',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 30000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-05',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 30000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-06',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 30000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-07',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 1000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-08',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 1000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-09',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 9000000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-10',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 5000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-11',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 30000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-12',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 30000.0,
      discontinued: 15132650.0,
    },
  ];
  const valuesForChart = processDataPerMonth(mockData, DateTime.fromISO('2023-01'));

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
        show: true,
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
          width: 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: valuesForChart.actuals,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },

        itemStyle: {
          color: isLight ? '#0EB19F' : '#027265',
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        name: 'Discontinued',
        data: valuesForChart.discontinued,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        itemStyle: {
          color: isLight ? '#027265' : '#2C3F3B',
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        name: 'Expense forecasts',
        data: valuesForChart.prediction,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        itemStyle: {
          color: isLight ? '#68FEE3' : '#1AAB9B',
          borderRadius: [6, 6, 0, 0],
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
