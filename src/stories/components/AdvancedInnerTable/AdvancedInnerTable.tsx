import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Title } from '../../containers/TransparencyReport/TransparencyReport';
import { TransparencyEmptyTable } from '../../containers/TransparencyReport/components/Placeholders/TransparencyEmptyTable';
import { NumberCell } from '../NumberCell/NumberCell';
import { TextCell } from '../TextCell/TextCell';
import { TransparencyCard } from '../TransparencyCard/TransparencyCard';

export interface InnerTableColumn {
  align?: string;
  header?: string;
  type?: 'number' | 'incomeNumber' | 'text' | 'custom';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRender?: (data: any) => JSX.Element;
  headerAlign?: string;
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  width?: string;
  minWidth?: string;
  hidden?: boolean;
  hasBorderRight?: boolean;
}

export interface InnerTableCell {
  column: InnerTableColumn;
  value: unknown | React.ReactElement;
  isBold?: boolean;
}

export type RowType = 'normal' | 'total' | 'section' | 'subTotal';

export interface InnerTableRow {
  type: RowType;
  items: InnerTableCell[];
  hideMobile?: boolean;
}

interface Props {
  columns: InnerTableColumn[];
  items: InnerTableRow[];
  style?: React.CSSProperties;
  cardsTotalPosition?: 'top' | 'bottom';
  tablePlaceholder?: JSX.Element;
  longCode: string;
}

type Alignment = 'left' | 'center' | 'right';

export const AdvancedInnerTable = ({ cardsTotalPosition = 'bottom', ...props }: Props) => {
  const { isLight } = useThemeContext();
  const getCell = (column: InnerTableColumn, rowType: RowType, value: unknown) => {
    if (value !== 0 && !value) {
      return <></>;
    }
    const isBold = rowType === 'total' || rowType === 'section' || rowType === 'subTotal';
    const columnType = rowType === 'total' && column?.type === 'custom' ? 'text' : column?.type;

    switch (columnType) {
      case 'number':
        return <NumberCell key={column.header} value={Number(value)} bold={isBold} />;
      case 'incomeNumber':
        return <NumberCell key={column.header} value={Number(value)} bold={isBold} isIncome={true} />;
      case 'text':
        return (
          <TextCell key={column.header} bold={isBold} isHeader={column.isCardHeader}>
            {value as string}
          </TextCell>
        );
      case 'custom':
        if (column?.cellRender) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return column?.cellRender(value as any);
        }
    }

    return (
      <TextCell key={column.header} bold={isBold} isHeader={column.isCardHeader}>
        {value as string}
      </TextCell>
    );
  };

  let cardItems =
    cardsTotalPosition === 'top' && props.items.length > 0
      ? [props.items[props.items.length - 1], ...props.items.slice(0, props.items.length - 1)]
      : props.items;

  cardItems = cardItems.filter((x) => !x.hideMobile);

  return props.items.length > 0 ? (
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
                      isLight={isLight}
                      hasBorderRight={column.hasBorderRight}
                      key={`header-${i}`}
                      style={{
                        textAlign: (column.headerAlign ?? column.align ?? 'left') as Alignment,
                        width: column.width ?? '120px',
                        minWidth: column.minWidth ?? 'unset',
                        overflow: 'hidden',
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
                        hasBorderRight={item.column.hasBorderRight}
                        isSubTotal={row.type === 'subTotal'}
                        isLight={isLight}
                        key={`${i}-${j}`}
                        textAlign={(item.column?.align ?? 'left') as Alignment}
                      >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {getCell(item.column, row.type, item.value as any)}
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
          item.type === 'section' ? (
            <Title isLight={isLight} fontSize="14px" key={`section-${i}`}>
              {item.items[0].value as string}
            </Title>
          ) : (
            <TransparencyCard
              itemType={item.type}
              key={`item-${i}`}
              header={
                <>
                  {item.items
                    .filter((x) => x.column?.isCardHeader && x.value && !x.column.hidden)
                    .map((x) => getCell(x.column, item.type, x.value))}
                </>
              }
              headers={props.columns.filter((x) => !x.isCardHeader && !x.isCardFooter).map((x) => x.header ?? '')}
              items={
                item.items
                  .filter((x) => !x.column?.isCardFooter && !x.column?.isCardHeader)
                  .map((x) => getCell(x.column, item.type, x.value)) ?? []
              }
              footer={
                item.items.filter((x) => x.column?.isCardFooter).length ? (
                  <>
                    {item.items.filter((x) => x.column?.isCardFooter).map((x) => getCell(x.column, 'normal', x.value))}
                  </>
                ) : undefined
              }
            />
          )
        )}
      </CardsWrapper>
    </>
  ) : (
    props.tablePlaceholder ?? <TransparencyEmptyTable longCode={props.longCode} />
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
  flex: '1',
  width: '100%',
});

const TableCell = styled.td<{
  textAlign: 'left' | 'center' | 'right';
  isSubTotal?: boolean;
  isLight?: boolean;
  hasBorderRight?: boolean;
}>(({ textAlign, isSubTotal, isLight, hasBorderRight }) => ({
  textAlign,
  ...(isSubTotal && {
    borderBottom: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  }),
  borderRight: hasBorderRight ? (isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
}));

const TableHead = styled.thead<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: '#708390',
  borderBottom: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  whiteSpace: 'nowrap',
}));

const HeadCell = styled.th<{ hasBorderRight?: boolean; isLight: boolean }>(({ hasBorderRight, isLight }) => ({
  padding: '24px 16px',
  fontWeight: 600,
  borderRight: hasBorderRight ? (isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
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
