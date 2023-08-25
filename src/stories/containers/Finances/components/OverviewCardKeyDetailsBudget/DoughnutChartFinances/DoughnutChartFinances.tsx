import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const DoughnutChartFinances: React.FC<Props> = ({ doughnutSeriesData }) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const isSmallDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1194', 'desktop_1280'));
  const normalSizeDesk = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));

  const {
    center,
    paddingLegend,
    paddingRichTextDai,
    paddingRichTextName,
    paddingRichTextPercent,
    paddingRichTextValue,
    radius,
  } = calculateValuesByBreakpoint(isTable, isSmallDesk, normalSizeDesk);

  const options = {
    color: doughnutSeriesData.map((data) => data.color),
    tooltip: {
      show: true,
      trigger: 'item',
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        width: 40,
      },

      formatter: function (params: DoughnutSeries) {
        const index = doughnutSeriesData.findIndex((data) => data.name === params.name);
        const itemRender = doughnutSeriesData[index];

        const customTooltip = `
        <div style="background-color:${isLight ? '#fff' : 'red'}; border:padding: 16px;width:194px">
          <div style="margin-bottom:4px;">${itemRender.percent} %</div>
          <div style="margin-bottom:16px">${itemRender.name}</div>
          <div style="display:flex;flex-direction:row;justify-content:space-between;">
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;">${itemRender.actuals}</div>
                <div style="font-weight:bold">Actuals</div>
             </div>
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;">${itemRender.budgetCap}</div>
                <div style="font-weight:bold">Budget Cap</div>
             </div>
          </div>
        </div>
        `;

        return customTooltip;
      },
    },

    series: [
      {
        name: 'Overview Card',
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
      orient: 'vertical',
      align: 'left',
      padding: paddingLegend,
      left: 'right',

      data: doughnutSeriesData.map((data) => data.name),
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,

      itemGap: 16,
      formatter: function (value: string) {
        const index = doughnutSeriesData.findIndex((data) => data.name === value);
        if (index !== -1) {
          const data = doughnutSeriesData[index];
          return `{name|${data.name}}\n{value|${data.value.toLocaleString('es-US') || '0'}}{dai|DAI}{percent|(${
            data.percent
          }%)}`;
        }
        return '';
      },

      textStyle: {
        fontFamily: 'Inter, sans-serif',
        fontStyle: 'normal',
        fontWeight: 400,
        color: isLight ? '#43435' : 'red',
        rich: {
          name: {
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            padding: paddingRichTextName,

            color: isLight ? '#43435' : 'red',
          },
          value: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : 'red',
            padding: paddingRichTextValue,
          },
          dai: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : 'red',
            padding: paddingRichTextDai,
          },
          percent: {
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : 'red',
            padding: paddingRichTextPercent,
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
        className="chart-container"
        option={options}
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </Container>
  );
};
export default DoughnutChartFinances;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 422,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: '100%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '100%',
    height: 196,
  },
});
