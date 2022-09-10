import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { NumberCell } from '../number-cell/number-cell';
import { TextCell } from '../text-cell/text-cell';
import { TransparencyCard } from '../transparency-card/transparency-card';
import { TransparencyEmptyTable } from '../../containers/transparency-report/placeholders/transparency-empty-table';
import { Title } from '../../containers/transparency-report/transparency-report';

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

export interface InnerTableCell {
  column: InnerTableColumn;
  value: unknown;
}

type RowType = 'normal' | 'total' | 'section';

export interface InnerTableRow {
  type: RowType;
  items: InnerTableCell[];
}

interface Props {
  columns: InnerTableColumn[];
  items: InnerTableRow[];
  style?: React.CSSProperties;
  responsiveTotalFirst?: boolean;
  cardsTotalPosition?: 'top' | 'bottom';
  tablePlaceholder?: JSX.Element;
}

type Alignment = 'left' | 'center' | 'right';

export const AdvancedInnerTable = ({
  cardsTotalPosition = 'bottom',
  ...props
}: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const getCell = (
    column: InnerTableColumn,
    rowType: RowType,
    value: unknown
  ) => {
    if (value !== 0 && !value) {
      return <></>;
    }

    const isBold = rowType === 'total' || rowType === 'section';
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

  const cardItems =
    cardsTotalPosition === 'top' && props.items.length > 0
      ? [
          props.items[props.items.length - 1],
          ...props.items.slice(0, props.items.length - 1),
        ]
      : props.items;

  return props.items.length > 0
    ? (
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
                    ?.filter((x) => !x.column.hidden)
                    .map((item, j) => (
                      <TableCell
                        key={`${i}-${j}`}
                        textAlign={(item.column?.align ?? 'left') as Alignment}
                      >
                        {getCell(item.column, row.type, item.value as never)}
                      </TableCell>
                    ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </TableWrapper>
      <CardsWrapper>
        {cardItems.map((item, i) =>
          item.type === 'section'
            ? (
            <Title isLight={isLight} fontSize="14px">
              {item.items[0].value as string}
            </Title>
              )
            : (
            <TransparencyCard
              key={`item-${i}`}
              header={
                <>
                  {item.items
                    .filter((x) => x.column?.isCardHeader && x.value)
                    .map((x) => getCell(x.column, item.type, x.value))}
                </>
              }
              headers={props.columns
                .filter((x) => !x.isCardHeader && !x.isCardFooter)
                .map((x) => x.header ?? '')}
              items={
                item.items
                  .filter(
                    (x) => !x.column?.isCardFooter && !x.column?.isCardHeader
                  )
                  .map((x) => getCell(x.column, item.type, x.value)) ?? []
              }
              footer={
                item.items.filter((x) => x.column?.isCardFooter).length
                  ? (
                  <>
                    {item.items
                      .filter((x) => x.column?.isCardFooter)
                      .map((x) => getCell(x.column, 'normal', x.value))}
                  </>
                    )
                  : undefined
              }
            />
              )
        )}
      </CardsWrapper>
    </>
      )
    : (
        props.tablePlaceholder ?? <TransparencyEmptyTable />
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
