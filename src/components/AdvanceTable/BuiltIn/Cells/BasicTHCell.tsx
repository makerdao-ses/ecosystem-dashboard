import { styled } from '@mui/material';
import React from 'react';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';

interface BasicTHCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const BasicTHCell: React.FC<BasicTHCellProps> = ({ cell, className, as = 'th' }) => (
  <TH className={className} asComponent={as} cell={cell} />
);

export default BasicTHCell;

const TH = styled(BasicCell, {
  shouldForwardProp: () => true,
})(() => ({
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  color: '#708390',
}));
