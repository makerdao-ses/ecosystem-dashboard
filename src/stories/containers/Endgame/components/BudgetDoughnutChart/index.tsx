import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Endgame/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const BudgetDoughnutChart: React.FC<Props> = ({ doughnutSeriesData }) => {
  const { isLight } = useThemeContext();
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const isSmallDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1194', 'desktop_1280'));
  const isNormalDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isNormalDeskPlus = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));

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
  } = calculateValuesByBreakpoint(isTablet, isSmallDesk, isNormalDesk, isNormalDeskPlus);

  const options = {
    color: doughnutSeriesData.map((data) => data.color),

    tooltip: {
      show: false,
      trigger: 'item',
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        width: 40,
      },
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
      itemGap: 18,

      formatter: function (value: string) {
        const index = doughnutSeriesData.findIndex((data) => data.name === value);
        if (index !== -1) {
          const data = doughnutSeriesData[index];
          return `{name|${data.name}}\n{value|${data.value}}{dai|DAI}{percent|(${data.percent}%)}`;
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
            color: isLight ? '#434358' : 'red',
          },
          value: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richValueFontSize,
            width: 'fit-content',
            padding: richValuePadding,
            color: isLight ? '#9FAFB9' : 'red',
          },
          dai: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richDaiFontSize,
            width: 'fit-content',
            padding: richDaiPadding,
            color: isLight ? '#9FAFB9' : 'red',
          },
          percent: {
            fontFamily: 'Inter, sans-serif',
            fontSize: richPercentFontSize,
            width: 'fit-content',
            padding: richPercentPadding,
            color: isLight ? '#9FAFB9' : 'red',
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
  width: '100%',
  height: '100%',
});
