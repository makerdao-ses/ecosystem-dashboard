import React from 'react';
import styled from '@emotion/styled';

interface Props {
  header: JSX.Element | string;
  headers: JSX.Element[] | string[];
  items: JSX.Element[];
  footer?: JSX.Element | string;
}

export const TransparencyCard = (props: Props) => {
  return <Container>
    <HeaderWrapper>
      {props.header}
    </HeaderWrapper>
    {props.headers.map((header, i) => <Row key={header.toString()}>
      <Label>{header}</Label>
      {props.items[i] ?? ''}
    </Row>)}
    {props.footer && <FooterWrapper>{props.footer}</FooterWrapper>}
  </Container>;
};

const Container = styled.div({
  display: 'block',
  boxShadow: '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  background: 'white',
  padding: '24px 16px 10px 16px',
  marginBottom: '24px',
});

const HeaderWrapper = styled.div({
  margin: '-16px 0 0 -16px',
});

const FooterWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  borderTop: '1px solid #D4D9E1',
  marginTop: '16px',
  padding: '8px 0 0',
});

const Row = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});

const Label = styled.div({
  display: 'flex',
  alignItems: 'center',
  color: '#708390',
  fontFamily: 'FT Base',
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
});
