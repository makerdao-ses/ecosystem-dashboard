import styled from '@emotion/styled';

import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import { getGranularity } from '../../utils/utils';
import LegendItemChart from '../LegendItemChart/LegendItemChart';
import LineYearBorderBottomChart from '../LineYearBorderBottomChart/LineYearBorderBottomChart';
import type { LegendItemsWaterFall, WaterFallChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  legends: LegendItemsWaterFall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: WaterFallChartSeriesData[];
}

const WaterFallChart: React.FC<Props> = ({ legends, year, selectedGranularity, series }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));

  const xAxisStyles = {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    color: '#708390',
    fontWeight: 600,
    fontSize: upTable ? 12 : 9,
    verticalAlign: 'top',
    interval: 0,
  };
  const options: EChartsOption = {
    grid: {
      top: isMobile ? 5 : isTablet ? 10 : isDesktop1024 ? 6 : isDesktop1280 ? 11 : 11,
      left: isMobile ? 42 : isTablet ? 42 : 42,
      right: isMobile ? 2 : isTablet ? 12 : isDesktop1024 ? 2 : isDesktop1280 ? 4 : 4,
    },
    xAxis: {
      type: 'category',
      data: getGranularity(selectedGranularity, isMobile, true),
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
        margin: isMobile ? 12 : isTablet ? 18 : isDesktop1024 ? 20 : isDesktop1280 ? 16 : 16,
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        formatter: function (value: string) {
          if (isMobile) {
            return value;
          }
          if (selectedGranularity === 'monthly') {
            return `{value|${value}}\n{year|${year}}`;
          }
          if (selectedGranularity === 'quarterly') {
            return `{value|${value}}  {year|${year}}`;
          }
          return `{year|${year}}`;
        },

        rich: {
          month: xAxisStyles,
          year: xAxisStyles,
        },
      },
    },
    yAxis: {
      min: 0,
      axisLabel: {
        formatter: function (value: number, index: number) {
          if (index === 0) {
            return value.toString();
          }
          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? '#231536' : '#EDEFFF',
        fontSize: isMobile ? 10 : isTablet ? 14 : 14,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,
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
          width: 0.25,
        },
      },
    },
    series,
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {isMobile && <LineYearBorderBottomChart year={year} />}
      </ChartContainer>
      <LegendContainer>
        {legends.map((legend, index) => (
          <LegendItemChart isSvg={false} key={index} title={legend.title} color={legend.color} />
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default WaterFallChart;

const Wrapper = styled.div({
  marginTop: 32,
  width: '100%',
});

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 343,
  height: 260,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 24,

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 446,
    maxWidth: 700,
    width: 7040,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    maxWidth: 954,
    width: 954,
    height: 508,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1028,
    height: 508,
    width: 1028,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1192,
    height: 508,
    width: 1192,
  },
});

const LegendContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingLeft: 8,
  gap: 32,
  marginTop: 10,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 60,
    rowGap: 16,
  },
});
