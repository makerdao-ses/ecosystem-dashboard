import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface InnerTableProps {
  headers: string[],
  items?: (JSX.Element | string)[][],
  headersAlign?: ('left' | 'center' | 'right')[],
  style?: CSSProperties,
}

export const InnerTable = ({ headersAlign = [], ...props }: InnerTableProps) => {
  return <Container style={props.style}>
    <Table>
      <TableHead>
        <tr>
          {props.headers.map((header, i) => <HeadCell key={`header-${i}`} style={{ textAlign: headersAlign[i] ?? 'left' }}>
            {header}
          </HeadCell>)}
        </tr>
      </TableHead>
      <tbody>
        {props.items?.map((row, i) => <tr key={i}>
          {row.map((item, j) => <td key={`${i}-${j}`} style={{ textAlign: headersAlign[i] ?? 'left' }}>{item}</td>)}
        </tr>)}
      </tbody>
    </Table>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
});

const Table = styled.table({
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
  flex: '1',
});

const TableHead = styled.thead({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#708390',
  borderBottom: '1px solid #D4D9E1',
});

const HeadCell = styled.th({
  padding: '24px 16px',
  width: '160px',
});
