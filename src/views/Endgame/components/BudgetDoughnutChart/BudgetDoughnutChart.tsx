import { styled, useMediaQuery } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { sortDoughnutSeriesByValue } from '@ses/core/utils/sort';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Theme } from '@mui/material';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  doughnutSeriesData: DoughnutSeries[];
}

const BudgetDoughnutChart: React.FC<Props> = ({ doughnutSeriesData }) => {
  const sortedDoughnutSeries = sortDoughnutSeriesByValue(doughnutSeriesData);
  const isTablet768 = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isUpDesktop1440 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1440'));
  const refChart = useRef<EChartsOption | null>(null);
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);

  const radius = useMemo(
    () => (isTablet768 ? [32, 64] : isDesktop1024 || isDesktop1280 || isUpDesktop1440 ? [48, 96] : [25, 52]),
    [isDesktop1024, isDesktop1280, isTablet768, isUpDesktop1440]
  );

  const options = useMemo(
    () => ({
      color: sortedDoughnutSeries.map((data) => data.color),

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
    [radius, sortedDoughnutSeries]
  );
  useEffect(() => {
    const chartInstance = refChart.current.getEchartsInstance();
    chartInstance.setOption(options, { notMerge: true });
  }, [options, refChart]);
  useEffect(() => {
    if (refChart.current) {
      const chartInstance = refChart.current.getEchartsInstance();
      chartInstance.setOption(options, { notMerge: true });

      chartInstance.on('mouseover', (params: EChartsOption) => {
        if (params.componentType === 'series') {
          setHoveredLegend(params.name);
        }
      });

      chartInstance.on('mouseout', (params: EChartsOption) => {
        if (params.componentType === 'series') {
          setHoveredLegend(null);
        }
      });
    }
  }, [options, refChart]);

  const onLegendItemHover = (name: string) => {
    if (refChart.current) {
      const chartInstance = refChart.current.getEchartsInstance();
      chartInstance.dispatchAction({
        type: 'highlight',
        name,
      });
    }
  };

  const onLegendItemLeave = (name: string) => {
    if (refChart.current) {
      const chartInstance = refChart.current.getEchartsInstance();
      chartInstance.dispatchAction({
        type: 'downplay',
        name,
      });
    }
  };

  return (
    <Container>
      <ECharts ref={refChart} option={options} opts={{ renderer: 'svg' }} />
      <LegendsContainer>
        {sortedDoughnutSeries.map((data) => (
          <LegendItem
            key={data.name}
            color={data.color}
            isHover={hoveredLegend === data.name}
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

const LegendItem = styled('div')<{ color: string; isHover?: boolean }>(({ theme, color, isHover = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 14,
  position: 'relative',
  cursor: 'pointer',
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 4,
  },
  ...(isHover && {
    'div:first-of-type': {
      color: theme.palette.isLight ? '#000000' : '#FFFFFF',
    },
    'div:nth-of-type(2)': {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.gray[500],
    },
  }),
  ':hover': {
    'div:first-of-type': {
      color: theme.palette.isLight ? '#000000' : '#FFFFFF',
    },
    'div:nth-of-type(2)': {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.gray[500],
    },
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
  ':hover': {
    color: theme.palette.isLight ? '#000000' : '#FFFFFF',
  },
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
