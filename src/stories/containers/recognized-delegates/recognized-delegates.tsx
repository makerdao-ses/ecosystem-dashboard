import styled from '@emotion/styled';
import DelegateSummary from '@ses/components/delegate-summary/delegate-summary';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

const RecognizedDelegatesContainer = () => (
  <Container>
    <NavigationSection>Navegation-Section</NavigationSection>
    <ContainerInside>
      <ContainerDelegate>
        <DelegateSummary />
      </ContainerDelegate>

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
  width: '100%',
  marginTop: 64,
});

const ContainerInside = styled.div({
  maxWidth: '343px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 1312,
    margin: '0 auto',
  },
});

const ContainerLine = styled.div({
  borderBottom: '1px solid #B6EDE7',
  width: '100%',
});

const NavigationSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  margin: '0 auto',
  width: '100%',
  maxWidth: '343px',
  height: 32,
  marginTop: 16,
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    height: 74,
    marginTop: 0,
    marginBottom: 24,
  },
});

const ContainerDelegate = styled.div({
  marginLeft: -16,
  marginBottom: 24,
});
