import styled from '@emotion/styled';
import DelegateSummary from '@ses/components/delegate-summary/delegate-summary';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

const RecognizedDelegatesContainer = () => (
  <Container>
    <div>Navigation-Section</div>
    <ContainerInside>
      <div
        style={{
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        <DelegateSummary />
      </div>
      <div>Last update</div>
      <div>View the onchain transaction for recognized delegates</div>
      <div>Tab Sections</div>
      <div>Sep 2022 Totals (Sectios)</div>
      <div>Sep 2022 Breakdown (Sectios)</div>
    </ContainerInside>
    <ContainerLine />
    <ContainerInside />
  </Container>
);

export default RecognizedDelegatesContainer;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  marginTop: 64,
});

const ContainerInside = styled.div({
  minWidth: 343,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    minWidth: 1312,
    margin: '0 auto',
  },
});

const ContainerLine = styled.div({
  borderBottom: '1px solid #B6EDE7',
  width: '100%',
});
