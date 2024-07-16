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

  return (
    <BorderedTR border={rowProps.border ?? {}} hover={!!rowProps.hover}>
      {children}
    </BorderedTR>
  );
};

export default DefaultTR;

const BorderedTR = styled('tr')<{ border: BorderConfig | Border; hover: boolean }>(({ border, hover, theme }) => ({
  ...buildBorderStyles(border, theme.palette.isLight),

  ...(hover && {
    '&:hover': {
      backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#292E38',
    },
  }),
}));
