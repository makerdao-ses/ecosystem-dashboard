import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { NumberCell } from '../number-cell/number-cell';
import { TextCell } from '../text-cell/text-cell';
import { TransparencyCard } from '../transparency-card/transparency-card';

export interface InnerTableCell {
  index: number;
  value: unknown;
}

export interface InnerTableColumn {
  align?: string;
  header?: string;
  type?: 'number' | 'text' | 'custom';
  cellRender?: (data: never) => JSX.Element;
  headerAlign?: string;
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  minWidth?: string;
  hidden?: boolean;
}

type RowType = 'normal' | 'total';

export interface InnerTableRow {
  type: RowType;
  items: InnerTableCell[];
}

interface Props {
  columns: InnerTableColumn[];
  items: InnerTableRow[];
  style?: React.CSSProperties;
  responsiveTotalFirst?: boolean;
}

type Alignment = 'left' | 'center' | 'right';

export const AdvancedInnerTable = ({ ...props }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const getCell = (
    column: InnerTableColumn,
    rowType: RowType,
    value: unknown
  ) => {
    if (value !== 0 && !value) {
      return <></>;
    }

    const isBold = rowType === 'total';
    const columnType =
      rowType === 'total' && column?.type === 'custom' ? 'text' : column?.type;

    switch (columnType) {
      case 'number':
        return <NumberCell value={Number(value)} bold={isBold} />;
      case 'text':
        return <TextCell bold={isBold}>{value as string}</TextCell>;
      case 'custom':
        if (column?.cellRender) {
          return column?.cellRender(value as never);
        }
    }

    return <TextCell bold={isBold}>{value as string}</TextCell>;
  };

  return (
    <>
      <TableWrapper>
        <Container isLight={isLight} style={props.style}>
          <Table>
            <TableHead isLight={isLight}>
              <tr>
                {props.columns
                  ?.filter((x) => !x.hidden)
                  .map((column, i) => (
                    <HeadCell
                      key={`header-${i}`}
                      style={{
                        textAlign: (column.headerAlign ??
                          column.align ??
                          'left') as Alignment,
                        width: column.minWidth ?? 'unset',
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
                  {row.items
                    ?.filter((x) => !props.columns[x.index]?.hidden)
                    .map((item, j) => (
                      <TableCell
                        key={`${i}-${j}`}
                        textAlign={
                          (props.columns[item.index]?.align ??
                            'left') as Alignment
                        }
                      >
                        {getCell(
                          props.columns[item.index],
                          row.type,
                          item.value as never
                        )}
                      </TableCell>
                    ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </TableWrapper>
      <CardsWrapper>
        {props.items.slice(0, props.items.length - 1).map((item, i) => (
          <TransparencyCard
            key={`item-${i}`}
            header={
              <>
                {item.items
                  .filter((x) => props.columns[x.index]?.isCardHeader)
                  .map((x) =>
                    getCell(props.columns[x.index], 'normal', x.value)
                  )}
              </>
            }
            headers={props.columns
              .filter((x) => !x.isCardHeader && !x.isCardFooter)
              .map((x) => x.header ?? '')}
            items={
              item.items
                .filter(
                  (x) =>
                    !props.columns[x.index]?.isCardFooter &&
                    !props.columns[x.index]?.isCardHeader &&
                    !props.columns[x.index]?.hidden
                )
                .map((x) =>
                  getCell(props.columns[x.index], 'normal', x.value)
                ) ?? []
            }
            footer={
              item.items.filter((x) => props.columns[x.index]?.isCardFooter)
                .length
                ? (
                <>
                  {item.items
                    .filter((x) => props.columns[x.index]?.isCardFooter)
                    .map((x) =>
                      getCell(props.columns[x.index], 'normal', x.value)
                    )}
                </>
                  )
                : undefined
            }
          />
        ))}
      </CardsWrapper>
    </>
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
  width: '100%',
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

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
});

const CardsWrapper = styled.div({
  display: 'block',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});
