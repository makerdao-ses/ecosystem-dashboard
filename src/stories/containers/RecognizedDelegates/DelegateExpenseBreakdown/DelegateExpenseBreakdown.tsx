import styled from '@emotion/styled';
import React from 'react';

const DelegateExpenseBreakdown = () => (
  <div>
    <Title>Delegate Expense Breakdown</Title>

    <CardContainer>Card</CardContainer>
  </div>
);

export default DelegateExpenseBreakdown;

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

const CardContainer = styled.div({
  marginTop: 24,
});
