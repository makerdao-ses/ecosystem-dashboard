import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React from 'react';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const DoughnutChartFinances: React.FC<Props> = ({ doughnutSeriesData }) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));

  const {
    center,
    paddingLegend,
    paddingRichTextDai,
    paddingRichTextName,
    paddingRichTextPercent,
    paddingRichTextValue,
    radius,
  } = calculateValuesByBreakpoint(isTable, isDesktop1024, isDesktop1280, isDesktop1440);

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
      padding: 0,
      borderWidth: 2,
      formatter: function (params: DoughnutSeries) {
        const index = doughnutSeriesData.findIndex((data) => data.name === params.name);
        const itemRender = doughnutSeriesData[index];
        const customTooltip = `
        <div style="background-color:${
          isLight ? '#fff' : '#000A13'
        };padding:16px;minWidth:194px;overflow:auto;border-radius:3px;">
          <div style="margin-bottom:4px;color:${isLight ? '#000' : '#EDEFFF'};">${itemRender.percent} %</div>
          <div style="margin-bottom:16px;color:${isLight ? '#000' : '#EDEFFF'};">${itemRender.name}</div>
          <div style="display:flex;flex-direction:row;gap:20px">
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;color:${isLight ? '#000' : '#EDEFFF'};">${itemRender.actuals.toLocaleString(
          'es-US'
        )}</div>
                <div style="font-weight:bold;color:${isLight ? '#231536' : '#9FAFB9'};">Actuals</div>
             </div>
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;color:${
                  isLight ? '#000' : '#EDEFFF'
                };">${itemRender.budgetCap.toLocaleString('es-US')}</div>
                <div style="font-weight:bold;color:${isLight ? '#231536' : '#9FAFB9'};">Budget Cap</div>
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
        color: isLight ? '#43435' : '#EDEFFF',
        rich: {
          name: {
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            padding: paddingRichTextName,

            color: isLight ? '#43435' : '#EDEFFF',
          },
          value: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
            padding: paddingRichTextValue,
          },
          dai: {
            fontSize: 14,
            width: 'fit-content',
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
            padding: paddingRichTextDai,
          },
          percent: {
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            color: isLight ? '#9FAFB9' : '#546978',
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
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 390,
    marginLeft: 32,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 420,
    marginLeft: 0,
    marginRight: 22,
    transition: 'all .4s ease',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    height: 210,
    width: 440,
    marginRight: 0,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 430,
  },
});
