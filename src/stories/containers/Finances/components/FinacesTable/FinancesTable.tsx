import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { showOnlySixteenRowsWithOthers, showOthersFooterRow, sortDataByElementCount } from '../../utils/utils';
import CellTable from './CellTable';
import type { MockData, QuarterlyBudget } from '../../utils/mockData';
import type { PeriodicSelectionFilter } from '../../utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  className?: string;
  breakdownTable: MockData;
  metrics: string[];
  year: string;
  period: PeriodicSelectionFilter;
}

const FinancesTable: React.FC<Props> = ({ className, breakdownTable, metrics, period }) => {
  const { isLight } = useThemeContext();
  const orderData = sortDataByElementCount(breakdownTable);
  const showFooterAndCorrectNumber = showOnlySixteenRowsWithOthers(orderData);
  const tables = Object.keys(showFooterAndCorrectNumber);
  const iteration = period === 'Quarterly' ? 5 : period === 'Monthly' ? 13 : 3;
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const desk1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1024'));
  const showSemiAnnual = isMobile && period === 'Semi-annual';
  const showAnnual = period === 'Annually';
  const showQuarterly = !isMobile && period === 'Quarterly';
  const showMonthly = desk1440 && period === 'Monthly';
  const arrayMetrics = new Array<number>(iteration).fill(0);

  // Show color for others depending if number are odd or even
  const isEven = showFooterAndCorrectNumber[`${tables[tables.length - 1]}`]?.length % 2 === 0;

  const showFooter = showOthersFooterRow(breakdownTable);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {tables.map((table, index) => (
        <TableContainer isLight={isLight} className={className} key={index}>
          <TableBody isLight={isLight}>
            {showFooterAndCorrectNumber[table].map((row: QuarterlyBudget) => (
              <TableRow isMain={row.isMain} isLight={isLight}>
                <Headed isLight={isLight} period={period}>
                  {row.name}
                </Headed>
                {showAnnual &&
                  metrics.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_) => <Cell isLight={isLight}>{12345}</Cell>
                  )}
                {showQuarterly &&
                  arrayMetrics.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_) => <CellTable metrics={metrics} />
                  )}
                {showSemiAnnual &&
                  arrayMetrics.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_) => <CellTable metrics={metrics} />
                  )}
                {showMonthly &&
                  arrayMetrics.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_) => <CellTable metrics={metrics} />
                  )}
              </TableRow>
            ))}
          </TableBody>
          {index === tables.length - 1 && showFooter && (
            <Footer isLight={isLight} isEven={isEven}>
              <FooterRow>
                <FooterCell>Others</FooterCell>
                {showQuarterly &&
                  arrayMetrics.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (_) => <CellTable metrics={metrics} />
                  )}
              </FooterRow>
            </Footer>
          )}
        </TableContainer>
      ))}
    </>
  );
};

export default FinancesTable;

const TableContainer = styled.table<WithIsLight>(({ isLight }) => ({
  borderCollapse: 'collapse',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  tableLayout: 'fixed',
  width: '100%',
  backgroundColor: isLight ? 'white' : '#1E2C37',
  borderRadius: '6px',
  '& tr:last-of-type td:last-of-type': {
    borderBottomRightRadius: 6,
  },

  '& tr:last-of-type th:last-of-type': {
    borderBottomLeftRadius: 6,
  },
  '& tfoot': {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
}));

const Headed = styled.th<WithIsLight & { period?: PeriodicSelectionFilter }>(({ isLight, period }) => ({
  borderRight: period !== 'Annually' ? `1px solid ${isLight ? '#D8E0E3' : '#405361'}` : 'none',
  fontSize: 11,
  color: isLight ? '#231536' : '#D2D4EF',
  width: 87,
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '16px 4px 16px 8px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    ...(period === 'Monthly' && {
      fontSize: 12,
    }),
    width: 150,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 150,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 220,
    padding: '16px 0px 16px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: period === 'Quarterly' ? 261 : period === 'Annually' ? 200 : 188,
    padding: '16px 0px 16px 32px',
    textOverflow: period === 'Monthly' ? 'ellipsis' : 'revert',
    ...(period === 'Monthly' && {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
    ...(period === 'Annually' && {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    width: period === 'Annually' ? 212 : 230,
    padding: period === 'Quarterly' ? '16px 0px 16px 16px' : '16px 0px 16px 32px',
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
    backgroundColor: isLight ? (isMain ? 'rgba(159, 175, 185, 0.17)' : 'inherit') : isMain ? '#2D3C48;' : 'inherit',
    fontWeight: isMain ? 600 : 400,
    borderRight: 'none',
    borderTopRightRadius: isMain ? 6 : 'none',
    borderBottomRightRadius: isMain ? 6 : 'none',
  },
  '& td': {
    fontWeight: isMain ? 600 : 400,
  },
}));

const TableBody = styled.tbody<WithIsLight>(({ isLight }) => ({
  '& tr:nth-of-type(odd):not(:first-child)': {
    backgroundColor: isLight ? '#F5F5F5' : '#18252E',
  },
  '& tr:nth-of-type(even):not(:first-child)': {
    backgroundColor: isLight ? '#ffffff' : '#1f2d37',
  },
  '& tr:first-of-type': {
    backgroundColor: isLight ? '#ECF1F3' : '#30434e',
  },
}));

const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));

const Footer = styled.tfoot<WithIsLight & { isEven: boolean }>(({ isLight, isEven }) => ({
  color: isLight ? '#231536' : '#D2D4EF',

  '& :last-of-type': {
    borderRight: 'none',
  },
  '& td:first-of-type': {
    borderBottomLeftRadius: 6,
    borderRight: `1px solid ${isLight ? '#D8E0E3' : '#405361'}`,
    padding: '16px 4px 16px 8px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    [lightTheme.breakpoints.up('desktop_1280')]: {
      padding: '16px 0px 16px 32px',
    },
  },
  backgroundColor: isLight ? (!isEven ? '#ffffff' : '#F5F5F5') : isEven ? '#18252E' : '#1f2d37',
}));

const FooterRow = styled.tr({});
const FooterCell = styled.td({});
