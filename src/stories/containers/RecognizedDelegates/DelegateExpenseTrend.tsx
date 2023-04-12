import styled from '@emotion/styled';
import React from 'react';

const DelegateExpenseTrend = () => (
  <Container>
    <Title>Delegate Expense Trend</Title>
    <Description>Delegate Compensation / Month</Description>
    <div>Filter</div>
    <div>Chart</div>
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
  marginTop: 4,
  marginBottom: 24,
});
