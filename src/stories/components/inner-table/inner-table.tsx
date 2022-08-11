import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../../containers/transparency-report/placeholders/transparency-empty-table';

interface InnerTableProps {
  headers: string[];
  items?: (JSX.Element | string)[][];
  headersAlign?: ('left' | 'center' | 'right')[];
  style?: CSSProperties;
  rowStyles?: CSSProperties[];
  minWidth?: number;
  headerWidths?: string[];
  headerStyles?: CSSProperties[];
}

export const InnerTable = ({
  headersAlign = [],
  minWidth = 160,
  headerWidths = [],
  headerStyles = [],
  ...props
}: InnerTableProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container style={props.style} isLight={isLight}>
      <Table>
        <TableHead isLight={isLight}>
          <tr>
            {props.headers.map((header, i) => (
              <HeadCell
                width={headerWidths[i] ?? 'unset'}
                minWidth={minWidth}
                key={`header-${i}`}
                style={{
                  textAlign: headersAlign[i] ?? 'left',
                  ...headerStyles[i],
                }}
              >
                {header}
              </HeadCell>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {props.items?.map((row, i) => (
            <tr key={i} style={props.rowStyles ? props.rowStyles[i] : {}}>
              {row.map((item, j) => (
                <TableCell
                  key={`${i}-${j}`}
                  textAlign={headersAlign[j] ?? 'left'}
                >
                  {item}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>;
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
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

const HeadCell = styled.th<{ minWidth: number; width: string }>(
  ({ minWidth, width }) => ({
    padding: '24px 16px',
    minWidth: `${minWidth}px`,
    width,
    fontWeight: '500',
  })
);
