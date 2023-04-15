import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';

import React from 'react';

interface Props {
  expenses: number[];
  months: string[];
}
const DelegateChart: React.FC<Props> = ({ expenses, months }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLight } = useThemeContext();

  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isZeroValue = false;

  const options = {
    grid: {
      border: '2px solid red',
      height: 190,
      right: '0%',
      bottom: '10%',
      // left: '2%',
    },
    xAxis: {
      type: 'category',
      data: months,
      splitLine: {
        show: false,
      },
      axisLine: {
        interval: 0,
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
        color: '#434358',
        interval: 0,
        fontSize: 9,
        lineHeight: 11,

        formatter: function (value: string, index: number) {
          if (value === 'J' && months[index - 1] === 'D') {
            return `{bgImg|${value}}`;
          }
          return value;
        },
        rich: {
          bgImg: {
            color: '#139D8D',
            padding: 3,
            fontFamily: 'Inter,san-serif',
            fontSize: 9,
            lineHeight: 11,
            interval: 0,
            backgroundColor: {
              image: '/drop.png',
            },
          },
        },
      },
    },
    yAxis: {
      min: 0,
      max: 120000,
      interval: 20000,
      nameTextStyle: {
        align: 'center',
      },
      axisLabel: {
        margin: 7,

        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
        },

        fontSize: 10,
        height: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,

        fontFeatureSettings: "'tnum' on, 'lnum' on",
      },
      verticalAlign: 'middle',
      height: upTable ? 15 : 12,

      type: 'value',
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: expenses.map((item, index) => (index === 0 ? 'none' : '#9FAFB9')),

          width: isZeroValue ? 0 : 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: expenses,
        type: 'bar',
        stack: 'x',
        showBackground: false,

        itemStyle: {
          barWidth: 6,
          borderRadius: 4,
          barGapCategory: 7,
          color: '#739BFC',
        },
      },
    ],
  };

  return (
    <Container>
      <ReactECharts
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
      <ContainerYears>
        <Year marginLeft={21} marginRight={17}>
          2021
        </Year>
        <Year marginRight={153}>2022</Year>
        <Year>2023</Year>
      </ContainerYears>
    </Container>
  );
};

const Container = styled.div({
  position: 'relative',
  height: 247,
  width: 343,
  maxWidth: 343,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    height: 387,
    width: 607,
    maxWidth: 607,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 387,
    width: 479,
    maxWidth: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
    maxWidth: 504,
  },
});

const ContainerYears = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  bottom: -19,
});

const Year = styled.div<{ marginRight?: number; marginLeft?: number }>(({ marginRight = 0, marginLeft = 0 }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  alignItems: 'center',
  color: '#139D8D',
  marginRight,
  marginLeft,
}));

export default DelegateChart;
