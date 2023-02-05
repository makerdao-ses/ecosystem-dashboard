/* eslint-disable spellcheck/spell-checker */
/* eslint-disable comma-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactECharts from 'echarts-for-react';
import React from 'react';

const ExpensesChart: React.FC = () => {
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
            color: '#231536',
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
            color: '#231536',
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
            color: '#231536',
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
        color: '#434358',
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
        formatter: function (value: number) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
          } else {
            return value.toString();
          }
        },
      },

      type: 'value',
      // eslint-disable-next-line spellcheck/spell-checker
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#9FAFB9',
          width: 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        type: 'bar',
        data: [0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 2500000, 3000000, 3500000, 3500000],
        showBackground: true,
        stack: 'x',
        backgroundStyle: {
          color: '#ECF1F3',
          borderRadius: 6,
        },

        itemStyle: {
          color: '#0EB19F',
          borderRadius: [0, 0, 6, 6],
        },
      },
      {
        name: 'Discontinued',
        data: [10000, 50000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 2500000, 3000000, 3500000, 3500000],
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: '#ECF1F3',
          borderRadius: 6,
        },
        itemStyle: {
          color: '#027265',
        },
      },
      {
        name: 'Expense forecasts',
        data: [
          928890, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 2500000, 3000000, 3500000, 3500000,
        ],
        type: 'bar',

        showBackground: true,

        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderRadius: 6,
        },
        itemStyle: {
          color: '#68FEE3',
          borderRadius: [6, 6, 0, 0],
        },
        stack: 'x',
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
