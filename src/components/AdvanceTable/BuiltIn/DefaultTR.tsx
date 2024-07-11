import { styled } from '@mui/material';
import { buildBorderStyles } from '../utils';
import type { Border, BorderConfig, RowProps } from '../types';

const DefaultTR: React.FC<RowProps & React.PropsWithChildren> = ({ children, ...rowProps }) => {
  if (rowProps.render) {
    return rowProps.render({
      ...rowProps,
      children,
    });
  }

  return <BorderedTR border={rowProps.border ?? {}}>{children}</BorderedTR>;
};

export default DefaultTR;

const BorderedTR = styled('tr')<{ border: BorderConfig | Border }>(({ border, theme }) => ({
  ...buildBorderStyles(border, theme.palette.isLight),
}));
