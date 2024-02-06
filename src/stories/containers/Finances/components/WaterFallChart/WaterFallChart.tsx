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
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));

  const xAxisStyles = {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: upTable ? 12 : 9,
    verticalAlign: 'top',
    interval: 0,
    padding: [0, 0, 3, 0],
  };
  const xYearStyles = {
    ...xAxisStyles,
    padding: [0, 0, 0, 0],
  };

  const startStyles = {
    ...xAxisStyles,
    color: isLight ? (isMobile ? '#231536' : '#434358') : '#B6BCC2',
  };

  const startYearStyles = {
    ...xYearStyles,
    color: isLight ? (isMobile ? '#231536' : '#434358') : '#B6BCC2',
  };

  const options: EChartsOption = {
    grid: {
      top: isMobile ? 5 : isTablet ? 10 : isDesktop1024 ? 8 : isDesktop1280 ? 11 : 11,
      left: isMobile ? 36 : isTablet ? 68 : isDesktop1024 ? 66 : isDesktop1280 ? 66 : isDesktop1440 ? 68 : 65,
      right: isMobile ? 2 : isTablet ? -2 : isDesktop1024 ? -2 : isDesktop1280 ? -2 : isDesktop1440 ? 1 : 1,
      height: isMobile ? 200 : isTablet ? 390 : isDesktop1024 ? 398 : isDesktop1280 ? 390 : isDesktop1440 ? 390 : 390,
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
        margin: isMobile ? 8 : isTablet ? 17 : isDesktop1024 ? 14 : isDesktop1280 ? 16 : isDesktop1440 ? 16 : 16,
        color: isLight ? '#B6BCC2' : '#546978',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: isMobile ? 400 : 600,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        interval: 0,
        formatter: function (value: string, index: number) {
          if (isMobile) {
            if (selectedGranularity === 'monthly' && (index === 0 || index === 13)) {
              return `{start|${value}}`;
            }
            return value;
          }
          if (selectedGranularity === 'monthly') {
            if (index === 0 || index === 13) {
              return `{start|${value}}\n{startYear|${year}}`;
            }
            return `{month|${value}}\n{year|${year}}`;
          }

          if (selectedGranularity === 'quarterly') {
            if (index === 0 || index === 5) {
              return `{start|${value}}\n{startYear|${year}}`;
            }
            return `{month|${value}}\n{year|${year}}`;
          }
          if (selectedGranularity === 'annual') {
            if (index === 0 || index === 2) {
              return `{start|${value}}\n{startYear|${year}}`;
            }
            return `{year|${year}}`;
          }
          return `{year|${year}}`;
        },

        rich: {
          month: xAxisStyles,
          year: xYearStyles,
          start: startStyles,
          startYear: startYearStyles,
        },
      },
    },
    yAxis: {
      min: 0,
      axisLabel: {
        padding: isMobile
          ? [0, 0, 0, 2]
          : isTablet
          ? [0, 14, 0, 0]
          : isDesktop1024
          ? [0, 12, 0, 0]
          : isDesktop1280
          ? [0, 6, 0, 0]
          : isDesktop1440
          ? [0, 12, 0, 0]
          : [0, 12, 0, 0],
        formatter: function (value: number, index: number) {
          if (index === 0) {
            return value.toString();
          }
          return replaceAllNumberLetOneBeforeDot(value);
        },
        color: isLight ? '#231536' : '#D2D4EF',
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
          color: isLight ? '#31424E' : '#D8E0E3',
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
        {legends?.map((legend, index) => (
          <LegendItemChart isSvg={false} key={index} title={legend.title} color={legend.color} />
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default WaterFallChart;

const Wrapper = styled.div({
  width: '100%',
});

const ChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 343,
  height: 275,
  marginLeft: 'auto',
  marginRight: 'auto',

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
    maxWidth: 1185,
    width: 1185,
    height: 508,
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
  paddingLeft: 2,
  gap: 32,
  marginTop: -6,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    paddingLeft: 0,
    marginTop: 42,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    marginTop: -20,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 64,
    marginTop: -20,
    marginLeft: -6,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 64,
    marginTop: -22,
    marginLeft: -6,
  },
});
