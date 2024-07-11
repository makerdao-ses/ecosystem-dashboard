import { styled } from '@mui/material';
import React from 'react';

import { formatNumber } from '../../../core/utils/string';
import type { RowType } from '../types';

interface NumberCellProps {
  value: number;
  bold?: boolean;
  className?: string;
  isIncome?: boolean;
  rowType?: RowType;
}

export const NumberCell: React.FC<NumberCellProps> = ({ value, bold, className, isIncome, rowType = 'normal' }) => (
  <Container
    className={className}
    bold={bold}
    negative={value < 0}
    isIncome={isIncome ?? false}
    isTotal={rowType === 'total'}
  >
    {formatNumber(value)}
  </Container>
);

const Container = styled('div')<{ negative?: boolean; isIncome: boolean; bold?: boolean; isTotal?: boolean }>(
  ({ negative = false, theme, isIncome, bold = 600, isTotal }) => ({
    fontFamily: 'Inter,san-serif',
    fontSize: '14px',
    lineHeight: '17px',
    padding: '10px 0',
    fontWeight: bold ? 700 : 600,
    letterSpacing: '0.3px',
    color: theme.palette.isLight
      ? negative
        ? isIncome
          ? theme.palette.colors.green[500]
          : theme.palette.colors.red[700]
        : isTotal
        ? theme.palette.colors.gray[900]
        : theme.palette.colors.gray[500]
      : negative
      ? isIncome
        ? theme.palette.colors.green[900]
        : theme.palette.colors.red[900]
      : isTotal
      ? theme.palette.colors.gray[50]
      : theme.palette.colors.gray[400],
    [theme.breakpoints.up('tablet_768')]: {
      padding: '8px 16px',
    },
    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  })
);
