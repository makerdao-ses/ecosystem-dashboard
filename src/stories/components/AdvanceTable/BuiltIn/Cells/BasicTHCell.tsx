import styled from '@emotion/styled';
import React from 'react';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';

interface BasicTHCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const BasicTHCell: React.FC<BasicTHCellProps> = ({ cell, className, as = 'th' }) => (
  <TH className={className} as={as} cell={cell} />
);

export default BasicTHCell;

const TH = styled(BasicCell)(() => ({
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  color: '#708390',
}));
