import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';

interface Props {
  header: JSX.Element | string;
  headers: JSX.Element[] | string[];
  items?: JSX.Element[];
  footer?: JSX.Element | string;
}

export const TransparencyCard = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container isLight={isLight}>
      <HeaderWrapper>{props.header}</HeaderWrapper>
      {props.headers.map((header, i) => (
        <Row key={header.toString()}>
          <Label>{header}</Label>
          {(props.items && props.items[i]) ?? ''}
        </Row>
      ))}
      {props.footer && <FooterWrapper isLight={isLight}>{props.footer}</FooterWrapper>}
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'block',
  boxShadow: isLight ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
  background: isLight ? 'white' : '#10191F',
  padding: '20px 24px 10px',
  marginBottom: '24px',
  borderRadius: '6px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    ':last-child': {
      marginBottom: '0px',
    },
  },
}));

const HeaderWrapper = styled.div({
  margin: '-16px 0 0 -16px',
  color: 'red',
});

const FooterWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderTop: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginTop: '16px',
  padding: '8px 0 0',
}));

const Row = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const Label = styled.div({
  display: 'flex',
  alignItems: 'center',
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '12px',
  height: '37px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
});
