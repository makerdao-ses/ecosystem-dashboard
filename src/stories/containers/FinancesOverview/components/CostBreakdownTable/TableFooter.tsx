import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { CostBreakdownFilterValue } from '../../financesOverviewTypes';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TableFooterProps {
  mode: CostBreakdownFilterValue;
  total: number;
}

const TableFooter: React.FC<TableFooterProps> = ({ mode, total = 0 }) => {
  const { isLight } = useThemeContext();

  return (
    <TableFooterContainer isLight={isLight}>
      <Total isLight={isLight}>Total </Total>
      <TotalNumber isLight={isLight} extraPadding={mode === 'By budget'}>
        {usLocalizedNumber(total)} <DAISpan isLight={isLight}>DAI</DAISpan>
      </TotalNumber>
    </TableFooterContainer>
  );
};

export default TableFooter;

const TableFooterContainer = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#F6F8F9' : 'red',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  padding: 8,
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(219, 0, 0, 0.8)',

  [lightTheme.breakpoints.up('table_834')]: {
    boxShadow: 'none',
    background: isLight ? '#ECF1F3' : 'red',
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
  color: isLight ? '#231536' : 'blue',
  textAlign: 'center',
  marginBottom: 10,

  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const TotalNumber = styled.div<WithIsLight & { extraPadding: boolean }>(({ isLight, extraPadding }) => ({
  fontSize: 24,
  fontWeight: 600,
  lineHeight: '29px',
  color: isLight ? '#231536' : 'blue',
  textAlign: 'center',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",

  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'right',
    paddingRight: extraPadding ? 85 : 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '19px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingRight: extraPadding ? 57 : 0,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingRight: extraPadding ? 68 : 0,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: extraPadding ? 85 : 0,
  },
}));

const DAISpan = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  textTransform: 'uppercase',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : 'blue',

  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
  },
}));
