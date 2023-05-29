import React from 'react';
import BasicTHCell from './BasicTHCell';
import BoldTextCell from './BoldTextCell';
import NumberCell from './NumberCell';
import TextCell from './TextCell';
import type { GenericCell } from '../../types';

interface DefaultCellProps {
  cell: GenericCell;
}

const DefaultCell: React.FC<DefaultCellProps> = ({ cell }) => {
  if (cell.isHidden) return null;

  if (cell.render) return cell.render(cell);

  if (cell.defaultRenderer) {
    switch (cell.defaultRenderer) {
      case 'basicHeader':
        return <BasicTHCell cell={cell} />;
      case 'boldText':
      case 'total': // total rows/cells has bold values
        return <BoldTextCell cell={cell} />;
      case 'number':
        return <NumberCell cell={cell} />;
      case 'incomeNumber':
      default:
        if (cell.isHeader) {
          return <BasicTHCell cell={cell} />;
        }
        return <TextCell cell={cell} as={'td'} />;
    }
  }
  if (cell.isHeader) {
    return <BasicTHCell cell={cell} />;
  }

  return <TextCell cell={cell} />;
};

export default DefaultCell;
