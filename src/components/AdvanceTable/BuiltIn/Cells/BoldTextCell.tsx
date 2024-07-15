import { styled } from '@mui/material';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';

interface BoldTextCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const BoldTextCell: React.FC<BoldTextCellProps> = ({ cell, className, as }) => (
  <BoldCell className={className} asComponent={as ?? cell.isHeader ? 'th' : 'td'} cell={cell} />
);

export default BoldTextCell;

const BoldCell = styled(BasicCell, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '22px',
  letterSpacing: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
