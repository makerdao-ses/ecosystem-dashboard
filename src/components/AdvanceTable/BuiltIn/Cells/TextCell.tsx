import { styled } from '@mui/material';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';

interface TextCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const TextCell: React.FC<TextCellProps> = ({ cell, className, as }) => (
  <Cell className={className} asComponent={as ?? (cell.isHeader ? 'th' : 'td')} cell={cell} />
);

export default TextCell;

const Cell = styled(BasicCell, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
