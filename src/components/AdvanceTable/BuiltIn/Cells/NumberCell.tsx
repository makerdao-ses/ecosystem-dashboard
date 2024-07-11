import { styled } from '@mui/material';
import BasicCell from './BasicCell';
import type { GenericCell, NumberCellExtraProps } from '../../types';

interface NumberCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const NumberCell: React.FC<NumberCellProps> = ({ cell, className, as }) => {
  const extra = cell.extraProps as NumberCellExtraProps;

  return (
    <Cell
      className={className}
      asComponent={as ?? (cell.isHeader ? 'th' : 'td')}
      cell={cell}
      isBold={extra?.isBold ?? false}
    />
  );
};

export default NumberCell;

const Cell = styled(BasicCell, {
  shouldForwardProp: (prop) => prop !== 'isBold',
})<{ isBold: boolean }>(({ theme, isBold }) => ({
  fontWeight: isBold ? 700 : 400,
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#FFFFFF',
  letterSpacing: 0.3,
  fontFeatureSettings: "'tnum' on, 'lnum' on",

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));
