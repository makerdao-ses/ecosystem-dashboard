import ReactECharts from 'echarts-for-react';
import React from 'react';

const ExpensesChart: React.FC = () => {
  const options = {
    legend: {
      width: '100%',
      itemGap: 29,
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
      type: 'value',
      // eslint-disable-next-line spellcheck/spell-checker
      zlevel: 1,
      axisLine: {
        lineStyle: {
          // color:'red',
        },
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
        data: [34, 22, 28, 43, 49, 10, 22, 28, 43, 49, 56, 89],

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
        data: [10, 22, 28, 43, 49, 10, 22, 28, 43, 49, 56, 89],
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
        data: [10, 22, 28, 43, 49, 10, 22, 28, 43, 49, 56, 89],
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
    <div style={{}}>
      <ReactECharts option={options} opts={{ renderer: 'svg' }} />
    </div>
  );
};

export default ExpensesChart;
