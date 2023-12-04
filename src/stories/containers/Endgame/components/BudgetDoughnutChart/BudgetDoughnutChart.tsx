import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Endgame/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const BudgetDoughnutChart: React.FC<Props> = ({ doughnutSeriesData }) => {
  const { isLight } = useThemeContext();
  const isTablet768 = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));
  const {
    radius,
    center,

    legendPadding,
    legendLeft,
    legendTop,

    richNameFontSize,
    richValueFontSize,
    richDaiFontSize,
    richPercentFontSize,

    richNamePadding,
    richValuePadding,
    richDaiPadding,
    richPercentPadding,
  } = calculateValuesByBreakpoint(isTablet768, isDesktop1024, isDesktop1280, isDesktop1440);

  const options = {
    color: doughnutSeriesData.map((data) => data.color),

    tooltip: {
      show: false,
    },

    series: [
      {
        name: 'Budget Doughnut Chart',
        type: 'pie',
        radius,
        center,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        textStyle: {
          color: 'red',
        },
        data: doughnutSeriesData,
      },
    ],

    legend: {
      data: doughnutSeriesData.map((data) => data.name),
      orient: 'vertical',
      padding: legendPadding,
      left: legendLeft,
      top: legendTop,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      align: 'left',
      itemGap: 19,

      formatter: function (value: string) {
        const index = doughnutSeriesData.findIndex((data) => data.name === value);
        if (index !== -1) {
          const data = doughnutSeriesData[index];
          return `{name|${data.name}}\n{value|${usLocalizedNumber(data.value)}}{dai|DAI}{percent|(${data.percent}%)}`;
        }
        return '';
      },

      textStyle: {
        fontWeight: 400,
        fontStyle: 'normal',
        rich: {
          name: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richNameFontSize,
            padding: richNamePadding,
            color: isLight ? '#434358' : '#708390',
          },
          value: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richValueFontSize,
            width: 'fit-content',
            padding: richValuePadding,
            color: isLight ? '#9FAFB9' : '#D1DEE6',
          },
          dai: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richDaiFontSize,
            width: 'fit-content',
            padding: richDaiPadding,
            color: isLight ? '#9FAFB9' : '#D1DEE6',
          },
          percent: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richPercentFontSize,
            width: 'fit-content',
            padding: richPercentPadding,
            color: isLight ? '#9FAFB9' : '#D1DEE6',
          },
        },
      },

      label: {
        show: false,
        position: 'top',
      },
    },
  };

  return (
    <Container>
      <ReactECharts
        className="budget-chart-container"
        option={options}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </Container>
  );
};

export default BudgetDoughnutChart;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 513, // 493 + 5px left + 15px paddingLeft
    paddingLeft: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: -5, // prevent hover to be cut by the overflow
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: '7.5%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: '12.5%',
  },
});
