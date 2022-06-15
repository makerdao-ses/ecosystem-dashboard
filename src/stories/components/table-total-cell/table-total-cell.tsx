import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface TableTotalCellProps {
  children: JSX.Element | JSX.Element[] | string,
  style?: CSSProperties,
}

export const TableTotalCell = (props: TableTotalCellProps) => {
  return <Container style={props.style}>{props.children}</Container>;
};

const Container = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  color: 'white',
  background: '#434358',
  padding: '16px',
  height: '51px',
  boxSizing: 'border-box',
  borderColor: '#434358',
});
