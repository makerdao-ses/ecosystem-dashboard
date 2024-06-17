import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface TableFooterProps {
  mode: CostBreakdownFilterValue;
  total: number;
  className?: string;
}

const TableFooter: React.FC<TableFooterProps> = ({ mode, total = 0, className }) => {
  const { isLight } = useThemeContext();

  return (
    <TableFooterContainer isLight={isLight} className={className}>
      <Total isLight={isLight}>Total </Total>
      <TotalNumber isLight={isLight} extraPadding={mode === 'By budget'}>
        {usLocalizedNumber(Math.round(total))} <DAISpan isLight={isLight}>DAI</DAISpan>
      </TotalNumber>
    </TableFooterContainer>
  );
};

export default TableFooter;

const TableFooterContainer = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#F6F8F9' : '#25273D',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  padding: 8,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    boxShadow: 'none',
    background: isLight ? '#ECF1F3' : '#25273D',
    padding: '14px 16px',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: '0 0 6px 6px',
  },
}));

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  marginBottom: 10,

  [lightTheme.breakpoints.up('tablet_768')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const TotalNumber = styled.div<WithIsLight & { extraPadding: boolean }>(({ isLight, extraPadding }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '29px',
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",

  [lightTheme.breakpoints.up('tablet_768')]: {
    textAlign: 'right',
    paddingRight: extraPadding ? 102 : 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '19px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingRight: extraPadding ? 118 : 0,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingRight: extraPadding ? 98 : 0,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: extraPadding ? 107 : 0,
  },
}));

const DAISpan = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : '#546978',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
}));
