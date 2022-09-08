import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { NumberCell } from '../number-cell/number-cell';
import { TextCell } from '../text-cell/text-cell';

interface Column {
  align?: string;
  header?: string;
  type?: 'number' | 'text' | 'custom';
  cellRender?: (data: unknown) => JSX.Element;
  headerAlign?: string;
}

interface Props {
  columns: Column[];
  items: string[][];
}

type Alignment = 'left' | 'center' | 'right';

export const InnerTable = ({ ...props }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const getCell = (column: Column, value: string) => {
    switch (column.type) {
      case 'number':
        return <NumberCell value={Number(value)}/>;
      case 'text':
        return <TextCell>{value}</TextCell>;
      case 'custom':
        return column?.cellRender && column?.cellRender(value);
      default:
        return <TextCell>{value}</TextCell>;
    }
  };

  return (
    <Container isLight={isLight}>
      <Table>
        <TableHead isLight={isLight}>
          <tr>
            {props.columns?.map((column, i) => (
              <HeadCell
                key={`header-${i}`}
                style={{
                  textAlign: (column.headerAlign ?? column.align ?? 'left') as Alignment
                }}
              >
                {column.header}
              </HeadCell>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {props.items?.map((row, i) => (
            <tr key={i}>
              {row.map((item, j) => (
                <TableCell
                  key={`${i}-${j}`}
                  textAlign={(props.columns[i]?.align ?? 'left') as Alignment}
                >
                  {getCell(props.columns[i], item)}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
  overflowX: 'auto',
  msOverFlowStyle: 'none',
  scrollbarWidth: 'thin',
}));

const Table = styled.table({
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  flex: '1',
});

const TableCell = styled.td<{ textAlign: 'left' | 'center' | 'right' }>(
  ({ textAlign }) => ({
    textAlign,
  })
);

const TableHead = styled.thead<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#708390',
  borderBottom: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  whiteSpace: 'nowrap',
}));

const HeadCell = styled.th(() => ({
  padding: '24px 16px',
  fontWeight: '500',
}));
