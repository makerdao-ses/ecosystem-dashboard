import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  totalDAI: string;
}

const TotalDaiExpense: React.FC<Props> = ({ totalDAI }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <TotalDai>{`${totalDAI} dai`}</TotalDai>
      <Line isLight={isLight} />
      <Description>Total DAI Expenses</Description>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
});
const TotalDai = styled.div({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: 0.4,
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#231536',
});

const Line = styled.div<WithIsLight>(({ isLight }) => ({
  width: 'fix-content',
  border: isLight ? '0.5px solid #B6EDE7' : '0.5px solid #06554C',
  marginTop: 1,
  marginBottom: 6,
}));

const Description = styled.div({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#231536',
  textAlign: 'center',
});

export default TotalDaiExpense;
