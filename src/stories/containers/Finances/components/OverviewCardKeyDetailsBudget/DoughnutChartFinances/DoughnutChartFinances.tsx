import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { calculateValuesByBreakpoint } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
  className?: string;
  isCoreThirdLevel?: boolean;
}

const DoughnutChartFinances: React.FC<Props> = ({ doughnutSeriesData, className, isCoreThirdLevel = true }) => {
  const chartRef = useRef<EChartsOption | null>(null);
  const { isLight } = useThemeContext();
  const [visibleSeries, setVisibleSeries] = useState<DoughnutSeries[]>(doughnutSeriesData);
  const [legends, setLegends] = useState<DoughnutSeries[]>(doughnutSeriesData);

  useEffect(() => {
    setVisibleSeries(doughnutSeriesData);
    setLegends(doughnutSeriesData);
  }, [doughnutSeriesData]);
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1440'));

  const { center, radius } = calculateValuesByBreakpoint(isTable, isDesktop1024, isDesktop1280, isDesktop1440);

  const options = {
    color: visibleSeries.map((data) => data.color),
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
        const index = visibleSeries.findIndex((data) => data.name === params.name);
        const itemRender = visibleSeries[index];
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
        data: visibleSeries,
      },
    ],
  };

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
          value: isVisible ? item.originalValue : -1,
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
        console.log('item.value', item.originalValue, item.value);
        return {
          ...item,
          color: isVisible ? item?.originalColor : 'rgb(204, 204, 204)',
          isVisible,
          value: item.originalValue,
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

  return (
    <Container className={className}>
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
      </ContainerChart>
      <ContainerLegend isCoreThirdLevel={isCoreThirdLevel}>
        {legends.map((data, index: number) => (
          <LegendItem
            isCoreThirdLevel={isCoreThirdLevel}
            isLight={isLight}
            key={index}
            onClick={() => toggleSeriesVisibility(data.name)}
            onMouseEnter={() => onLegendItemHover(data.name)}
            onMouseLeave={() => onLegendItemLeave(data.name)}
          >
            <IconWithName>
              <LegendIcon backgroundColor={data.color || 'blue'} />
              <NameOrCode isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
                {isCoreThirdLevel ? data.code : data.name}
              </NameOrCode>
            </IconWithName>
            <Value isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
              {data.value?.toLocaleString('es-US')}
              <span>DAI</span>
              <span>{`(${data.percent}%)`}</span>
            </Value>
          </LegendItem>
        ))}
      </ContainerLegend>
    </Container>
  );
};
export default DoughnutChartFinances;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 64,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 32,
    justifyContent: 'center',
  },
});

const ContainerChart = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  border: '2px solid blue',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 138,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 138,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    // height: 210,
    width: 210,
    // width: 440,
    // marginRight: 0,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 210,
  },
});

const LegendIcon = styled.div<{ backgroundColor: string }>(({ backgroundColor }) => ({
  backgroundColor,
  width: 8,
  height: 8,
  borderRadius: '50%',
}));
const LegendItem = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
  display: 'flex',
  flexDirection: isCoreThirdLevel ? 'row' : 'column',
  gap: isCoreThirdLevel ? 4 : 8,
  fontSize: 12,
  fontFamily: 'Inter, sans-serif',
  color: isLight ? '#43435' : '#EDEFFF',
  cursor: 'pointer',
  minWidth: 190,
}));
const Value = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
  color: isLight ? '#9FAFB9' : '#546978',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  marginLeft: isCoreThirdLevel ? 4 : 16,
  '& span': {
    marginLeft: 4,
  },
}));

const ContainerLegend = styled.div<{ isCoreThirdLevel: boolean }>(({ isCoreThirdLevel }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: isCoreThirdLevel ? 16 : 8,
  maxWidth: '100%',
  maxHeight: '210px',
  overflow: 'hidden',
  padding: isCoreThirdLevel ? 'unset' : '20px 0',
}));

const IconWithName = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  alignItems: 'center',
});

const NameOrCode = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
  color: isLight ? (isCoreThirdLevel ? '#708390' : '#434358') : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
}));
