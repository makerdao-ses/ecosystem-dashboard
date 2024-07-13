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
})(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));
