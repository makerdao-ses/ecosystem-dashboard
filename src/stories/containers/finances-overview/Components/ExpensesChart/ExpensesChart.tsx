import ReactECharts from 'echarts-for-react';
import React from 'react';

const ExpensesChart: React.FC = () => {
  const options = {
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
        name: 'actual',
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
        name: 'discontinued',
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
        name: 'prediction',
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
