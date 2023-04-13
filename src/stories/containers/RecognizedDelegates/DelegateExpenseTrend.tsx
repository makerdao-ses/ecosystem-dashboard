import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateChart from './components/DelegateChart';
import FilterDelegate from './components/FilterDelegate';
const DelegateExpenseTrend: React.FC = () => (
  <Container>
    <Title>Delegate Expense Trend</Title>
    <Description>Delegate Compensation / Month</Description>
    <div style={{ marginBottom: 32 }}>
      <FilterDelegate />
    </div>
    {/* <div
      style={{
        width: 30,
        height: 40,
        lineHeight: 40,
        borderRadius: 15,
        backgroundColor: '#739BFC',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        // textShadowColor: '#000',
        // textShadowBlur: 5,
        // textShadowOffsetX: 2,
        // textShadowOffsetY: 2,
        // Agrega la forma de gota de lluvia
        backgroundImage: 'radial-gradient(circle at 50% 60%, transparent 20px, #739BFC 21px)',
        backgroundSize: '100% 100%',
      }}
    >
      J
    </div> */}
    <ExpensesChartColumn>
      <DelegateChart />
      {/* <YearContainer>
        <Year marginRight={18}>2021</Year>
        <Year>2022</Year>
        <Spacer />
        <Year>2023</Year>
      </YearContainer> */}
    </ExpensesChartColumn>
  </Container>
);

export default DelegateExpenseTrend;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',

  letterSpacing: '0.75px',
  color: '#231536',
  marginTop: 0,
  marginBottom: 0,
});

const Description = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#231536',
  marginTop: 5,
  marginBottom: 24,
});

const ExpensesChartColumn = styled.div({
  width: 343,
  // border: '2px solid blue',
  // margin: '16px auto 0',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    margin: '32px auto 0',
    width: 666,
    paddingRight: 59,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '52px auto 0',
    width: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
  },
});

const YearContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginLeft: 3,
  marginTop: 3,
});

const Year = styled.div<{ marginRight?: number }>(({ marginRight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#139D8D',
  marginRight,
}));

const Spacer = styled.div({
  display: 'flex',
  width: 150,
});
