import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
// import LegendItem from '@ses/containers/FinancesOverview/components/ExpensesChart/LegendItem';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';

import React from 'react';

// import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';

// const dataMock = [
//   6091, 8412, 8232, 8117, 9839, 4879, 1749, 8823, 3373, 1517, 6743, 7642, 9434, 8604, 9674, 1663, 5783, 3297, 3423,
//   6762, 4264, 9644, 4304, 1867, 7411, 7322,
// ];
const dataMock = [
  64523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023, 97321,
  120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
];
const DelegateChart: React.FC = () => {
  console.log('first', dataMock.length);
  const { isLight } = useThemeContext();
  //   const isUpDesktop1194 = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  // const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isZeroValue = false;

  const options = {
    grid: {
      height: 200,
      right: '0%',
      bottom: '10%',
      // left: '6%',
    },
    xAxis: {
      type: 'category',
      data: ['N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J'],
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
        formatter: function (value: any) {
          // Agrega un círculo alrededor de cada letra
          return value;
        },
        rich: {
          backgroundColor: {
            image: '/drop.png',
            // It can be URL of a image,
            // or dataURI,
            // or HTMLImageElement,
            // or HTMLCanvasElement.
          },
          // Define la apariencia del círculo
          // drop: {
          //   width: 30,
          //   height: 40,
          //   lineHeight: 40,
          //   borderRadius: 15,
          //   backgroundColor: '#739BFC',
          //   textAlign: 'center',
          //   color: '#fff',
          //   fontWeight: 'bold',
          //   fontSize: 18,
          //   textShadowColor: '#000',
          //   textShadowBlur: 5,
          //   textShadowOffsetX: 2,
          //   textShadowOffsetY: 2,
          //   // Agrega la forma de gota de lluvia
          //   backgroundImage: 'radial-gradient(circle at 50% 60%, transparent 20px, #739BFC 21px)',
          //   backgroundSize: '100% 100%',
          // },
        },
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
        fontFeatureSettings: "'tnum' on, 'lnum' on",
      },
    },
    yAxis: {
      min: 0,
      max: 120000,
      interval: 20000,
      // interval: 4,
      axisLabel: {
        margin: 7,
        // splitNumber: 9,
        // interval: 2,
        // margin: upTable ? 16 : 7,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
        },
        // color: isLight ? '#231536' : '#EDEFFF',
        fontSize: upTable ? 12 : 10,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,

        fontFeatureSettings: "'tnum' on, 'lnum' on",
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
          //   color: 'none',
          color: dataMock.map((item, index) => (index === 0 ? 'none' : '#9FAFB9')),
          //   color: isLight ? '#31424E' : '#D8E0E3',
          width: isZeroValue ? 0 : 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: dataMock,
        type: 'bar',
        stack: 'x',
        showBackground: false,
        // backgroundStyle: {
        //   color: isLight ? '#ECF1F3' : '#10191F',
        //   borderRadius: 4,
        // },
        // barWidth: upTable && !isUpDesktop1194 ? 40 : isUpDesktop1194 ? 32 : 22,
        // barWidth: 8,
        itemStyle: {
          barWidth: 8,
          borderRadius: 4,

          //   color: isLight ? '#0EB19F' : '#027265',
          color: '#739BFC',
        },
      },
    ],
  };

  return (
    // <ContainerAndLegend>
    //   <Legend>
    //     <LegendItem
    //       color={isLight ? '#0EB19F' : '#027265'}
    //       text="Active Budget"
    //       style={{ paddingLeft: isTable ? 0 : upTable ? 10 : 10 }}
    //     />
    //     <LegendItem color={isLight ? '#027265' : '#2C3F3B'} text="Discontinued" />
    //     <LegendItem color={isLight ? '#68FEE3' : '#1AAB9B'} text="Expense forecasts" />
    //   </Legend>
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
    // </ContainerAndLegend>
  );
};

// const ContainerAndLegend = styled.div({
//   display: 'flex',
//   flexDirection: 'column',
// });

const Container = styled.div({
  height: 230,
  width: 343,
  maxWidth: 343,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    height: 387,
    width: 607,
    maxWidth: 607,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 387,
    width: 479,
    maxWidth: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
    maxWidth: 504,
  },
});

// const Legend = styled.div({
//   maxWidth: 343,
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   marginBottom: -4,

//   [lightTheme.breakpoints.up('table_834')]: {
//     marginBottom: -8,
//     paddingLeft: 60,
//     maxWidth: 607,
//   },

//   [lightTheme.breakpoints.up('desktop_1194')]: {
//     marginBottom: -8,
//     paddingLeft: 11,
//     maxWidth: 479,
//   },

//   [lightTheme.breakpoints.up('desktop_1280')]: {
//     maxWidth: 504,
//     paddingLeft: 36,
//   },
// });

export default DelegateChart;
