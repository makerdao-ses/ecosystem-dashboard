import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { sortDoughnutSeriesByValue } from '@ses/core/utils/sort';
import lightTheme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCorrectMetricValuesOverViewChart } from '../../SectionPages/CardChartOverview/utils';
import CardLegend from './CardLegend';
import DaiToolTipIcon from './DaiToolTipIcon';
import DoughnutChartFinancesSkeleton from './DoughnutChartFinancesSkeleton';
import { chunkArray } from './utils';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { AnalyticMetric, BudgetMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
  className?: string;
  isCoreThirdLevel?: boolean;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
  selectedMetric: AnalyticMetric;
}

const DoughnutChartFinances: React.FC<Props> = ({
  doughnutSeriesData,
  className,
  isCoreThirdLevel = true,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel = 5,
  selectedMetric,
}) => {
  const chartRef = useRef<EChartsOption | null>(null);
  const ref = useRef<SwiperRef>(null);
  const { isLight } = useThemeContext();
  const [visibleSeries, setVisibleSeries] = useState<DoughnutSeries[]>(doughnutSeriesData);
  const [legends, setLegends] = useState<DoughnutSeries[]>(doughnutSeriesData);

  useEffect(() => {
    setVisibleSeries(doughnutSeriesData);
    setLegends(doughnutSeriesData);
    // avoid to cut off the chart on page load
    chartRef.current?.getEchartsInstance()?.resize();
  }, [doughnutSeriesData]);
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));

  const { center, radius } = calculateValuesByBreakpoint(isTable, isDesktop1024, isDesktop1280, isDesktop1440);

  useEffect(() => {
    // Resize chart on window resize to avoid UI flickering
    const onResize = () => {
      const chartInstance = chartRef.current?.getEchartsInstance();
      chartInstance?.resize();
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const tooltipSelectedMetricLabel = useMemo(() => {
    switch (selectedMetric) {
      case 'PaymentsOnChain':
        return 'Net Expenses On-Chain';
      case 'ProtocolNetOutflow':
        return 'Net Protocol Outflow';
      default:
        return selectedMetric;
    }
  }, [selectedMetric]);

  const doughnutSeriesChunks = chunkArray(sortDoughnutSeriesByValue(doughnutSeriesData), numberSliderPerLevel);
  const numberSlider = doughnutSeriesChunks.size;
  const options = useMemo(
    () => ({
      color: visibleSeries.map((data) => data.color),
      tooltip: {
        extraCssText: `z-index:${zIndexEnum.ECHART_TOOL_TIP}`,
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
          const index = visibleSeries.findIndex((data) => data.name === params.name);
          const itemRender = visibleSeries[index];
          const selectedMetricKey = getCorrectMetricValuesOverViewChart(selectedMetric) as keyof BudgetMetric;
          const customTooltip = `
        <div style="background-color:${
          isLight ? '#fff' : '#000A13'
        };padding:16px;min-width:194px;overflow:auto;border-radius:3px;">
          <div style="margin-bottom:4px;color:${isLight ? '#000' : '#EDEFFF'};">${
            itemRender.percent === 0
              ? 0
              : itemRender.percent < 0.1
              ? '<0.1'
              : itemRender.percent < 1
              ? usLocalizedNumber(itemRender.percent, 2)
              : usLocalizedNumber(itemRender.percent, 1)
          }%</div>
          <div style="margin-bottom:16px;color:${
            isLight ? '#000' : '#EDEFFF'
          };max-width: 300px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${itemRender.name}</div>
          <div style="display:flex;flex-direction:row;gap:20px">
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;color:${isLight ? '#000' : '#EDEFFF'};">${usLocalizedNumber(
            itemRender.metrics[selectedMetricKey === 'budget' ? 'paymentsOnChain' : selectedMetricKey].value,
            2
          )}</div>
                <div style="font-weight:bold;color:${isLight ? '#231536' : '#9FAFB9'};">${
            selectedMetric === 'Budget' ? 'Net Expenses On-Chain' : tooltipSelectedMetricLabel
          }</div>
             </div>
              <div style="display:flex;flex-direction:column">
                <div style="margin-bottom:4;color:${isLight ? '#000' : '#EDEFFF'};">${usLocalizedNumber(
            itemRender.metrics.budget.value,
            2
          )}</div>
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
          data: visibleSeries.map((data) => ({
            ...data,
            // transform negative values to positive to avoid hidden values on the chart
            value: Math.abs(data.value),
          })),
        },
      ],
    }),
    [center, isLight, radius, selectedMetric, tooltipSelectedMetricLabel, visibleSeries]
  );

  const toggleSeriesVisibility = (seriesName: string) => {
    const chartInstance = chartRef.current?.getEchartsInstance();

    const newArray = visibleSeries.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        });
        const isVisible = !item.isVisible;
        return {
          ...item,
          isVisible,
          value: isVisible ? item.originalValue || 0 : -1,
        };
      }
      return item;
    });
    // iterate through legends
    const newLegend = legends.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        });
        const isVisible = !item.isVisible;
        return {
          ...item,
          color: isVisible ? item?.originalColor || 'red' : 'rgb(204, 204, 204)',
          isVisible,
          value: item.originalValue || 0,
        };
      }
      return item;
    });
    setLegends(newLegend);

    setVisibleSeries(newArray);
  };
  const onLegendItemHover = (legendName: string) => {
    const dataIndex = visibleSeries.find((data) => data.name === legendName);

    if (dataIndex) {
      if (dataIndex.value !== 0) {
        const chartInstance = chartRef.current.getEchartsInstance();

        chartInstance.dispatchAction({
          type: 'highlight',
          name: legendName,
          seriesIndex: 0,
        });

        chartInstance.dispatchAction({
          type: 'showTip',
          name: legendName,
          seriesIndex: 0,
        });
      }
    }
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      name: legendName,
    });
    chartInstance.dispatchAction({
      type: 'hideTip',
    });
  };

  // Options of Swiper
  const swiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
      1024: {
        spaceBetween: 2,
      },
      1280: {
        spaceBetween: 2,
      },
      1440: {
        spaceBetween: 2,
      },
      1920: {
        spaceBetween: 2,
      },
    },
  } as SwiperProps;

  useEffect(() => {
    // avoid to merge data when moving between levels
    const chartInstance = chartRef?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <DoughnutChartFinancesSkeleton />;
  }

  return (
    <Container className={className} isCoreThirdLevel={isCoreThirdLevel}>
      <ContainerChart>
        <ReactECharts
          ref={chartRef}
          className="chart-container"
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        <ContainerDaiIcon>
          <DaiToolTipIcon />
        </ContainerDaiIcon>
      </ContainerChart>
      {showSwiper ? (
        <SwiperWrapper isCoreThirdLevel={isCoreThirdLevel} numberSliderPerLevel={numberSliderPerLevel}>
          <Swiper
            direction="horizontal"
            ref={ref}
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            {...swiperOptions}
          >
            <ContainerLegend
              isCoreThirdLevel={isCoreThirdLevel}
              changeAlignment={changeAlignment}
              numberSlider={numberSlider}
            >
              {Array.from(doughnutSeriesChunks.entries()).map(([index, dataChunk]) => (
                <SwiperSlide key={index}>
                  <CardLegend
                    key={index}
                    changeAlignment={changeAlignment}
                    doughnutSeriesData={dataChunk}
                    toggleSeriesVisibility={toggleSeriesVisibility}
                    onLegendItemHover={onLegendItemHover}
                    onLegendItemLeave={onLegendItemLeave}
                    isCoreThirdLevel={isCoreThirdLevel}
                  />
                </SwiperSlide>
              ))}
            </ContainerLegend>
          </Swiper>
        </SwiperWrapper>
      ) : (
        <ContainerLegendNotSwiper isCoreThirdLevel={isCoreThirdLevel}>
          {
            <CardLegend
              changeAlignment={changeAlignment}
              doughnutSeriesData={doughnutSeriesData}
              toggleSeriesVisibility={toggleSeriesVisibility}
              onLegendItemHover={onLegendItemHover}
              onLegendItemLeave={onLegendItemLeave}
              isCoreThirdLevel={isCoreThirdLevel}
            />
          }
        </ContainerLegendNotSwiper>
      )}
    </Container>
  );
};
export default DoughnutChartFinances;

const Container = styled.div<{ isCoreThirdLevel: boolean }>(({ isCoreThirdLevel }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 64,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 20,
    justifyContent: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 30,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: isCoreThirdLevel ? 40 : 64,
  },
}));

const ContainerChart = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'relative',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 138,
    minWidth: 138,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 138,
    minWidth: 138,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 210,
    minWidth: 210,
  },
});

const ContainerLegend = styled.div<{ isCoreThirdLevel: boolean; changeAlignment: boolean; numberSlider: number }>(
  ({ isCoreThirdLevel, changeAlignment, numberSlider }) => ({
    display: 'flex',
    flex: isCoreThirdLevel && numberSlider >= 2 ? 1 : 'none',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isCoreThirdLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isCoreThirdLevel ? 16 : 14,
    maxWidth: '100%',
    position: 'relative',
    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 16,
    },
  })
);

const ContainerLegendNotSwiper = styled.div<{ isCoreThirdLevel: boolean }>(({ isCoreThirdLevel }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: isCoreThirdLevel ? 16 : 14,
  maxWidth: '100%',
  position: 'relative',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },
}));

const SwiperWrapper = styled.div<{ isCoreThirdLevel: boolean; numberSliderPerLevel: number }>(
  ({ isCoreThirdLevel, numberSliderPerLevel }) => ({
    display: 'none',

    [lightTheme.breakpoints.up('tablet_768')]: {
      marginTop: isCoreThirdLevel ? 10 : 16,
      display: 'flex',
      position: 'relative',
      width: 200,
      height: numberSliderPerLevel === 5 ? 'calc(100% + 8px)' : 'calc(100% - 4px)',
    },

    [lightTheme.breakpoints.up('desktop_1024')]: {
      marginTop: isCoreThirdLevel ? 10 : 16,
      display: 'flex',
      height: isCoreThirdLevel ? 'calc(100% + 8px)' : 'calc(100% - 16px)',
      width: 250,
      minWidth: 250,
    },

    [lightTheme.breakpoints.up('desktop_1280')]: {
      marginTop: !isCoreThirdLevel ? 10 : 10,
      display: 'flex',
      position: 'relative',
      height: 'calc(100% - 8px)',
      ...(numberSliderPerLevel === 10 && {
        minWidth: 365,
        height: 'calc(100% - 10px)',
      }),
    },

    [lightTheme.breakpoints.up('desktop_1440')]: {
      marginTop: !isCoreThirdLevel ? 10 : 10,
      display: 'flex',
      position: 'relative',
      height: 'calc(100% - 8px)',
      ...(numberSliderPerLevel === 10 && {
        minWidth: 440,
        height: 'calc(100% - 10px)',
      }),
    },

    '& .swiper-pagination-horizontal': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    '& .swiper-pagination-bullet': {
      width: 8,
      height: 8,
      borderRadius: 1,
      '&:first-child': {
        borderRadius: '6px 1px 1px 6px',
      },
      '&:last-child': {
        borderRadius: '1px 6px 6px 1px',
      },
    },
    '& .swiper-pagination-bullet-active': {
      backgroundColor: '#2DC1B1 !important',
    },
  })
);

const ContainerDaiIcon = styled.div({
  width: 64,
  height: 64,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
});
