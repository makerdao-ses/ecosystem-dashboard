import { styled, useMediaQuery, useTheme } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { sortDoughnutSeriesByValue } from '@ses/core/utils/sort';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Theme } from '@mui/material';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const BudgetDoughnutChart: React.FC<Props> = ({ doughnutSeriesData }) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const sortedDoughnutSeries = sortDoughnutSeriesByValue(doughnutSeriesData);
  const isTablet768 = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isUpDesktop1440 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1440'));
  const refChart = useRef<EChartsOption | null>(null);

  const radius = useMemo(
    () => (isTablet768 ? [32, 64] : isDesktop1024 || isDesktop1280 || isUpDesktop1440 ? [48, 96] : [25, 52]),
    [isDesktop1024, isDesktop1280, isTablet768, isUpDesktop1440]
  );

  const options = useMemo(
    () => ({
      color: sortedDoughnutSeries.map((data) => data.color),
      tooltip: {
        show: true,
        trigger: 'item',
        borderRadius: 12,
        backgroundColor: isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: isLight ? '#D4D9E1' : '#231536',
            opacity: 0.15,
          },
        },
        padding: 0,
        borderColor: isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
        formatter: function (params: DoughnutSeries) {
          const index = sortedDoughnutSeries.findIndex((data) => data.name === params.name);
          const itemRender = sortedDoughnutSeries[index];
          const customTooltip = `
        <div style="background-color:${
          isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
        };padding:8px 16px;min-width:194px;overflow:auto;border-radius:12px;">
          <div style="margin-bottom:0px;font-size:18px;font-weight: 700;color:${
            isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
          };">${usLocalizedNumber(itemRender.percent, 1)}%</div>
          <div style="margin-bottom:4px;font-weight: 600;font-size:14px;color:${
            isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[300]
          };max-width: 300px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;margin-bottom:12px;">${
            itemRender.name
          }</div>
          <div style="display:flex;flex-direction:row;justify-content:space-between;">
              <div style="display:flex;flex-direction:column">
                <div style="font-weight:600;font-size:16px;color:${
                  isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
                };">${usLocalizedNumber(itemRender.actuals ?? 0)}</div>
                <div style="font-size:12px;font-weight:500;color:${
                  isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[500]
                };">Actuals</div>
             </div>
              <div style="display:flex;flex-direction:column">
                <div style="font-weight:600;color:${
                  isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
                };justify-self:flex-end;align-self:flex-end">${usLocalizedNumber(itemRender.budgetCap ?? 0)}</div>
                <div style="font-weight:500;color:${
                  isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[500]
                };font-size:12px">Budget Cap</div>
             </div>
          </div>
        </div>
        `;

          return customTooltip;
        },
      },
      series: [
        {
          name: 'Budget Doughnut Chart',
          type: 'pie',
          radius,
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
          data: sortedDoughnutSeries,
        },
      ],
    }),
    [isLight, radius, sortedDoughnutSeries, theme.palette.colors.charcoal, theme.palette.colors.slate]
  );

  useEffect(() => {
    const chartInstance = refChart.current.getEchartsInstance();
    chartInstance.setOption(options, { notMerge: true });
  }, [options, refChart]);

  const onLegendItemHover = (name: string) => {
    const chartInstance = refChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      name,
    });
  };

  const onLegendItemLeave = (name: string) => {
    const chartInstance = refChart.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      name,
    });
  };

  return (
    <Container>
      <ECharts ref={refChart} option={options} opts={{ renderer: 'svg' }} />
      <LegendsContainer>
        {sortedDoughnutSeries.map((data) => (
          <LegendItem
            key={data.name}
            color={data.color}
            onMouseEnter={() => onLegendItemHover(data.name)}
            onMouseLeave={() => onLegendItemLeave(data.name)}
          >
            <LegendName>{data.name}</LegendName>
            <LegendValues>
              {usLocalizedNumber(data.value)} DAI ({usLocalizedNumber(data.percent, 1)}%)
            </LegendValues>
          </LegendItem>
        ))}
      </LegendsContainer>
    </Container>
  );
};

export default BudgetDoughnutChart;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  width: '100%',
  gap: 16,
  marginTop: 18,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 32,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    justifyContent: 'center',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 25,
  },
}));

const ECharts = styled(ReactECharts)(({ theme }) => ({
  width: 113,
  height: '120px!important',
  margin: '2px -5px 0 5px',

  [theme.breakpoints.up('tablet_768')]: {
    width: 138,
    height: '138px!important',
    margin: '-6px 0 0 -6px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 205,
    height: '205px!important',
  },
}));

const LegendsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    paddingTop: 12,
    marginRight: -12,
    gap: 16,
  },
}));

const LegendItem = styled('div')<{ color: string }>(({ theme, color }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 14,
  position: 'relative',
  cursor: 'pointer',

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 4,
  },

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 4,
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: color,
  },
}));

const LegendName = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
}));

const LegendValues = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));
