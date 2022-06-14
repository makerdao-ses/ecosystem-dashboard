import React from 'react';
import styled from '@emotion/styled';

interface TableCellProps {
  negative?: boolean;
  children: string | JSX.Element | JSX.Element[]
}

export const TableCell = (props: TableCellProps) => {
  return <Container negative={props.negative}>{props.children}</Container>;
};

const Container = styled.div<{ negative?: boolean }>(({ negative = false }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: 16,
  padding: '24px 16px',
  color: negative ? '#F75524' : '#25273D',
}));
