import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string.utils';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';

import React from 'react';

import LegendItem from './LegendItem';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chart.dto';

interface Props {
  newActual: ValuesDataWithBorder[];
  newDiscontinued: ValuesDataWithBorder[];
  newPrediction: ValuesDataWithBorder[];
}

const ExpensesChart: React.FC<Props> = ({ newActual, newDiscontinued, newPrediction }: Props) => {
  const { isLight } = useThemeContext();
  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  // eslint-disable-next-line spellcheck/spell-checker
  const isZeroValue = false;
  const options = {
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
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
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
        barWidth: upTable ? 36 : 22,
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
        barWidth: upTable ? 40 : 24,
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
        barWidth: upTable ? 40 : 24,
        itemStyle: {
          color: isLight ? '#68FEE3' : '#1AAB9B',
        },
      },
    ],
  };

  return (
    <>
      <Legend>
        <LegendItem color={isLight ? '#0EB19F' : '#027265'} text="Active Budget" />
        <LegendItem color={isLight ? '#027265' : '#2C3F3B'} text="Discontinued" />
        <LegendItem color={isLight ? '#68FEE3' : '#1AAB9B'} text="Expense forecasts" />
      </Legend>
      <Container>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100vw',
          }}
        />
      </Container>
    </>
  );
};

const Container = styled.div({
  height: 387,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: 607,
  },
});

const Legend = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',

  gap: 29,
  [lightTheme.breakpoints.up('table_834')]: {
    gap: 50,
  },
});

export default ExpensesChart;
