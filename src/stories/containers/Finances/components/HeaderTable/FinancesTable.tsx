import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MockData } from '../../utils/mockData';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  className?: string;
  breakdownTable: MockData;
}

const FinancesTable: React.FC<Props> = ({ className, breakdownTable }) => {
  const { isLight } = useThemeContext();
  const tables = Object.keys(breakdownTable);
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {tables.map((_) => (
        <TableContainer isLight={isLight} className={className}>
          <TableBody>
            <TableRow isMain isLight={isLight}>
              <Headed isLight={isLight}>Atlas Immutable AA Budgets </Headed>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed isLight={isLight}>Aligned Voter Committees</Headed>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed isLight={isLight}>Aligned Delegates</Headed>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
            </TableRow>
            <TableRow isLight={isLight}>
              <Headed isLight={isLight}>SubDAOs</Headed>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
              <Cell isLight={isLight}>2208889</Cell>
            </TableRow>
          </TableBody>
        </TableContainer>
      ))}
    </>
  );
};

export default FinancesTable;

const TableContainer = styled.table<WithIsLight>(({ isLight }) => ({
  borderCollapse: 'collapse',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  borderRadius: 6,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  tableLayout: 'fixed',
  width: '100%',
}));

const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : 'red'}`,
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
}));

const Headed = styled.th<WithIsLight>(({ isLight }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : 'red'}`,
  fontSize: 14,
  color: '#231536',
  width: 145,
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '16px 8px',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 150,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 220,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 261,
    padding: '16px 0px 16px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    width: 230,
    padding: '16px 8px',
  },
}));

const TableRow = styled.tr<WithIsLight & { isMain?: boolean }>(({ isMain = false, isLight }) => ({
  '& th': {
    borderTopLeftRadius: isMain ? 6 : 'none',
    borderBottomLeftRadius: isMain ? 6 : 'none',
    fontWeight: isMain ? 700 : 400,
    textAlign: 'left',
  },
  '& td:last-of-type': {
    backgroundColor: isLight ? (isMain ? 'rgba(159, 175, 185, 0.17)' : 'inherit') : 'red',
    fontWeight: isMain ? 600 : 400,
    borderRight: 'none',
    borderTopRightRadius: isMain ? 6 : 'none',
    borderBottomRightRadius: isMain ? 6 : 'none',
  },
  '& td': {
    fontWeight: isMain ? 600 : 400,
  },
}));

const TableBody = styled.tbody({
  '& tr:nth-of-type(odd):not(:first-child)': {
    backgroundColor: '#F5F5F5',
  },
  '& tr:first-of-type': {
    backgroundColor: '#ECF1F3',
  },
});
