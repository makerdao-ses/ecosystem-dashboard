import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { showOnlySixteenRowsWithOthers, sortDataByElementCount } from '../../utils/utils';
import CellTable from './CellTable';
import type { MetricValues, PeriodicSelectionFilter, ItemRow, TableFinances } from '../../utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  className?: string;
  breakdownTable: TableFinances[];
  metrics: string[];
  year: string;
  period: PeriodicSelectionFilter;
}

const FinancesTable: React.FC<Props> = ({ className, breakdownTable, metrics, period }) => {
  const { isLight } = useThemeContext();

  const orderData = sortDataByElementCount(breakdownTable);
  const showFooterAndCorrectNumber = showOnlySixteenRowsWithOthers(orderData);
  const iteration = period === 'Quarterly' ? 5 : period === 'Monthly' ? 13 : period === 'Annually' ? 1 : 3;
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const desk1440 = useMediaQuery(lightTheme.breakpoints.up('desktop_1024'));
  const showSemiAnnual = isMobile && period === 'Semi-annual';
  const showAnnual = period === 'Annually';
  const showQuarterly = !isMobile && period === 'Quarterly';
  const showMonthly = desk1440 && period === 'Monthly';
  const arrayMetrics = new Array<number>(iteration).fill(0);
  const newMetrics = metrics.map((metric) =>
    metric === 'Net Expenses On-chain'
      ? 'PaymentsOnChain'
      : metric === 'Net Protocol Outflow'
      ? 'ProtocolNetOutflow'
      : metric
  );

  return (
    <>
      {showFooterAndCorrectNumber.map((table: TableFinances, index) => (
        <TableContainer isLight={isLight} className={className} key={index} hasOthers={table.others || false}>
          <TableBody isLight={isLight}>
            {table.rows.map((row: ItemRow, index) => (
              <TableRow key={index} isLight={isLight} isMain={row.isMain}>
                <Headed isLight={isLight} period={period}>
                  {row.name}
                </Headed>

                {showAnnual &&
                  newMetrics.map((metric, index) => {
                    // Check if don't have columns to show add cero
                    const value = row.columns.length !== 0;
                    if (!value) {
                      return (
                        <Cell key={index} isLight={isLight}>
                          0
                        </Cell>
                      );
                    }
                    return (
                      <Cell key={index} isLight={isLight}>
                        {usLocalizedNumber(row.columns[0][metric as keyof MetricValues], 0)}
                      </Cell>
                    );
                  })}

                {showQuarterly &&
                  arrayMetrics.map((_, index) => (
                    <CellTable key={index} metrics={newMetrics} value={row.columns[index]} />
                  ))}
                {showSemiAnnual &&
                  arrayMetrics.map((_, index) => (
                    <CellTable key={index} metrics={newMetrics} value={row.columns[index]} />
                  ))}
                {showMonthly &&
                  arrayMetrics.map((_, index) => (
                    <CellTable key={index} metrics={newMetrics} value={row.columns[index]} />
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      ))}
    </>
  );
};

export default FinancesTable;

const TableContainer = styled.table<WithIsLight & { hasOthers: boolean }>(({ isLight, hasOthers }) => ({
  borderCollapse: 'collapse',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  tableLayout: 'fixed',
  width: '100%',
  backgroundColor: isLight ? 'white' : '#1E2C37',
  borderRadius: '6px',
  '& tr:last-of-type td:last-of-type': {
    borderBottomRightRadius: hasOthers ? 0 : 6,
  },

  '& tr:last-of-type th:last-of-type': {
    borderBottomLeftRadius: hasOthers ? 0 : 6,
  },

  '& tfoot td:last-of-type': {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
}));

const Headed = styled.th<WithIsLight & { period?: PeriodicSelectionFilter }>(({ isLight, period }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : '#405361'}`,
  fontSize: 11,
  color: isLight ? '#231536' : '#D2D4EF',
  width: 87,
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '16px 4px 16px 8px',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',

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
    borderTopLeftRadius: isMain ? 6 : '0',
    borderBottomLeftRadius: isMain ? 6 : '0',
    fontWeight: isMain ? 700 : 400,
    textAlign: 'left',
  },
  '& td:last-of-type': {
    backgroundColor: isLight ? (isMain ? 'rgba(159, 175, 185, 0.17)' : 'inherit') : isMain ? '#2D3C48;' : 'inherit',
    fontWeight: isMain ? 600 : 400,
    borderRight: 'none',
    borderTopRightRadius: isMain ? 6 : '0',
    borderBottomRightRadius: isMain ? 6 : '0',
  },
  '& td': {
    fontWeight: isMain ? 600 : 400,
  },
}));

const TableBody = styled.tbody<WithIsLight>(({ isLight }) => ({
  '& tr:nth-of-type(odd):not(:first-child)': {
    backgroundColor: isLight ? '#F5F5F5' : '#18252E',
    borderRadius: 40,
  },
  '& tr:nth-of-type(even):not(:first-child)': {
    backgroundColor: isLight ? '#ffffff' : '#1f2d37',
  },
  '& tr:first-of-type': {
    backgroundColor: isLight ? '#ECF1F3' : '#30434e',
  },
  '& tr:nth-of-type(odd):not(:first-child) td:last-of-type': {
    backgroundColor: isLight ? 'rgba(159, 175, 185, 0.10)' : '#111C23',
  },
  '& tr:nth-of-type(even):not(:first-child) td:last-of-type': {
    backgroundColor: isLight ? 'rgba(209, 222, 230, 0.20)' : '#17232C',
  },
}));
const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  borderRight: `1px solid ${isLight ? '#D8E0E3' : '#405361'}`,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));
