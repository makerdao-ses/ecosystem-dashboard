import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import ReactECharts from 'echarts-for-react';
import React from 'react';

interface Props {
  otherExpenses: number;
  delegatesExpenses: number;
}

const DoughnutChart: React.FC<Props> = ({ delegatesExpenses, otherExpenses }) => {
  const options = {
    tooltip: {
      show: false,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '100%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        hoverAnimation: false,
        data: [
          {
            value: otherExpenses,
            name: 'Other Expenses',
            itemStyle: {
              color: '#D2D4EF',
              emphasis: { color: '#D2D4EF' },
            },
          },
          {
            value: delegatesExpenses,
            name: 'Expense',
            ite: {
              color: ' #447AFB',
              emphasis: { color: ' #447AFB' },
            },
          },
        ],
      },
    ],
  };

  return (
    <ContainerAndLegend>
      <Container>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
      </Container>
    </ContainerAndLegend>
  );
};

const ContainerAndLegend = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  transform: 'rotate(90deg)',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    height: 128,
    width: 128,
    maxWidth: 128,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 128,
    width: 128,
    maxWidth: 128,
  },
});

export default DoughnutChart;
