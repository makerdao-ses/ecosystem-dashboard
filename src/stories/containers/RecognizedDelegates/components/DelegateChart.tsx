import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getMonthsBetweenDateDeskFormat, getMonthsBetweenDatesMobileFormat } from '@ses/core/utils/chart';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DateTime } from 'luxon';

interface Props {
  expenses: number[];
  startDate: DateTime;
  endDate: DateTime;
}

const DelegateChart: React.FC<Props> = ({ expenses, endDate, startDate }) => {
  const { isLight } = useThemeContext();
  const MONTHS_DESK = getMonthsBetweenDateDeskFormat(startDate, endDate);
  const MONTS_MOBILE = getMonthsBetweenDatesMobileFormat(startDate, endDate);
  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isZeroValue = false;

  const options = {
    grid: {
      height: upTable ? 230 : 190,

      right: upTable ? '0%' : 2,
      ...(!upTable && { left: 40 }),
      ...(upTable && { left: 48 }),
      bottom: upTable ? '10%' : '10.5%',
    },
    xAxis: {
      type: 'category',
      data: upTable ? MONTHS_DESK : MONTS_MOBILE,
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
        interval: 0,
        formatter: function (value: string, index: number) {
          if ((value === 'J' && MONTHS_DESK[index - 1] === 'D') || MONTS_MOBILE[index - 1] === 'D') {
            return `{bgImg|${value}}`;
          }
          return value;
        },
        rich: {
          bgImg: {
            verticalAlign: 'top',
            color: '#139D8D',
            padding: upTable ? [1, 4, 7, 4] : 3,

            fontFamily: 'Inter, sans-serif',
            fontSize: upTable ? 12 : 9,
            lineHeight: upTable ? 15 : 11,
            interval: 0,
            backgroundColor: {
              image: isLight
                ? upTable
                  ? '/assets/img/drop-desk.svg'
                  : '/assets/img/drop.svg'
                : upTable
                ? '/assets/img/drop-dark-desk.svg'
                : '/assets/img/drop-dark.svg',
            },
          },
        },
        textStyle: {
          fontFamily: 'Inter, sans-serif',
          color: upTable ? (isLight ? '#708390' : '#708390') : isLight ? '#434358' : '#708390',
          fontSize: upTable ? 12 : 9,
          lineHeight: upTable ? 15 : 11,
          padding: upTable ? [1, 4, 8, 4] : 3,
        },
      },
    },
    yAxis: {
      nameTextStyle: {
        align: 'center',
      },
      axisLabel: {
        margin: upTable ? 14 : 12,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }
          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
        },

        fontSize: upTable ? 12 : 10,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,
        fontFeatureSettings: "'tnum' on, 'lnum' on",
        color: isLight ? '#231536' : '#EDEFFF',
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
          color: expenses.map((item, index) => (index === 0 ? 'none' : isLight ? '#9FAFB9' : '#D8E0E3')),

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
        barWidth: upTable ? 22 : 12,
        barGapCategory: upTable ? 16 : 7,

        itemStyle: {
          borderRadius: 4,
          barGap: 32,
          barGapCategory: upTable ? 16 : 7,
          color: isLight ? '#739BFC' : '#447AFB',
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
        <Year isLight={isLight}>2021</Year>
        <ExtendedYearSecond isLight={isLight}>2022</ExtendedYearSecond>
        <ExtendedYearThird isLight={isLight}>2023</ExtendedYearThird>
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
  margin: '0 auto',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 690,
    maxWidth: 690,
    height: 289,
    margin: '0 auto',
  },
});

const ContainerYears = styled.div({
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  bottom: -19,
  [lightTheme.breakpoints.up('table_834')]: {
    bottom: -21,
  },
});

const Year = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  alignItems: 'center',
  color: isLight ? '#139D8D' : '#2DC1B1',
  marginLeft: 21,

  marginRight: 25,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 40,

    marginRight: 60,
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const ExtendedYearSecond = styled(Year)({
  marginLeft: 0,
  marginRight: 185,

  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 0,
    marginRight: 425,
  },
});

const ExtendedYearThird = styled(Year)({
  marginLeft: 0,
  marginRight: 0,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 0,
    marginRight: 0,
  },
});
export default DelegateChart;
