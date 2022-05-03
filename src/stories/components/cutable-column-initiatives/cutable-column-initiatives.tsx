import React from 'react';
import styled from '@emotion/styled';

interface CutableColumnInitiativesProps {
  initiatives: string
}

export const CutableColumnInitiatives = (props: CutableColumnInitiativesProps) => {
  return <Container>
    <RoundedBox href="#">
      {props.initiatives}
    </RoundedBox>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Roboto, sans-serif'
});

const RoundedBox = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: '#333366',
  borderRadius: '10px',
  textDecoration: 'none',
  color: 'white',
  fontSize: '16px'
});
